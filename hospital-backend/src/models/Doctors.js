import mongoose, {Schema} from "mongoose"

const doctorSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        index:true,
    },
    
    fullName: {
        type: String,
        required: true,
        trim: true
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

    phone: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },

    qualification: {
        type: String
    },

    experience: {
        type: Number   // years of experience
    },

    department: {
        type: String
    },
    consultationFee: {
        type: Number
    },

    availability: {
        type: Boolean,
        default: true
    }

},
{
    timestamps:true
}
)

export const Doctor=mongoose.model("Doctor",doctorSchema)