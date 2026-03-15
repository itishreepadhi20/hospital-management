import mongoose, {Schema} from "mongoose"

const patientSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        index:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type:String,
        enum:["Admitted","Discharged"],
        default:"Admitted"
    },
    phone: {
        type: String
    },

    age: {
        type: Number
    },

    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    address: {
        type: String
    },

    medicalHistory: {
        type: String
    },

    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        }
    ]

},
{
    timestamps:true
}
)

patientSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

patientSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

patientSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
patientSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const Patient=mongoose.model("Patient",patientSchema)