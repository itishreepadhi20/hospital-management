import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Patient } from "../models/Patients.models.js";

/**
 * Middleware to verify JWT token and attach patient to req
 */
export const verifyJWT = asyncHandler(async (req, res, next) => { 
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request: token missing");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch patient from DB
        const patient = await Patient.findById(decodedToken._id).select("-password -refreshToken");

        if (!patient) {
            throw new ApiError(401, "Invalid Access Token: patient not found");
        }

        // Attach patient to request object
        req.patient = patient;

        // Proceed to next middleware/controller
        next();
    } catch (error) {
        // Log for debugging
        console.error("JWT verification error:", error);

        // Always return generic unauthorized message
        throw new ApiError(401, "Invalid access token");
    }
});