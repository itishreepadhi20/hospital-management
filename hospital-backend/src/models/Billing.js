import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Bill = mongoose.model("Bill", billSchema);

export default Bill;