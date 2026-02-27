import React, { useState } from "react";

const UpdateAppointment = () => {
  const [formData, setFormData] = useState({
    patient: "Rahul Sharma",
    doctor: "Dr. Mehta",
    date: "2026-02-27",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Appointment:", formData);
    alert("Appointment Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Appointment</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Update Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAppointment;