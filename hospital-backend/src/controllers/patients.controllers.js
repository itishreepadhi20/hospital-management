import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"
import {Patient} from "../models/Patients.models.js"
import {uploadOnCloudinary} from  "../utils/cloudinary.js"


const generateAccessAndRefreshTokens=async(patientId)=>{
  try {
    const patient=await Patient.findById(patientId)
    const accessToken=patient.generateAccessToken()
    const refreshToken=patient.generateRefreshToken()
    
    patient.refreshToken = refreshToken
        await patient.save({ validateBeforeSave: false })

        return {accessToken,refreshToken}
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}


const registerPatient = asyncHandler(async(req,res)=> {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullName, email, username, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await Patient.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const patient = await Patient.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await Patient.findById(patient._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )


const loginPatient=asyncHandler(async(req,res)=>{
  // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie
    const {username,email,password}=req.body

    if(!username && !email){
      throw new ApiError(400, "username or email is required")
    }

    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const patient=await Patient.findOne({
      $or:[{username},{email}]      
    })

    if (!patient) {
        throw new ApiError(404, "User does not exist")
      }

  const isPasswordValid=await patient.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid patient credentials")
  }
 const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(patient._id)

 const loggedInUser=await Patient.findById(patient._id).select("-password -refreshToken")

 const options = {
        httpOnly: true,
        secure: true
    }

     return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
            200, 
            {
                patient: loggedInUser, accessToken, refreshToken
            },
            "patient logged In Successfully"
        )
    )
  
})

const logoutPatient=asyncHandler(async(req,res)=>{
    await Patient.findByIdAndUpdate(
        req.patient._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"Patient loggedout"))
})

export {
  registerPatient,
  loginPatient,
  logoutPatient
}