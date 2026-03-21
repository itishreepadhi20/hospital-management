import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    trim: true
  }
});

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: String, 
      required: true
    },

    doctorId: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending"
    },

    review: {
      type: reviewSchema,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);