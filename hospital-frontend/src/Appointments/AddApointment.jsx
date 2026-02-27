import React, { useState } from "react";

const AddAppointment = () => {
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    date: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);
    alert("Appointment Added Successfully!");
    setFormData({ patient: "", doctor: "", date: "", status: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Appointment</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="patient"
            placeholder="Patient Name"
            value={formData.patient}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="doctor"
            placeholder="Doctor Name"
            value={formData.doctor}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;