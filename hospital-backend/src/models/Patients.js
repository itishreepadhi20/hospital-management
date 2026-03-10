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

export const Patient=mongoose.model("Patient",patientSchema)