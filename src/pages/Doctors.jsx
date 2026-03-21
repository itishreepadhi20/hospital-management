import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";

export default function Doctors() {
  const { doctors, addDoctor, deleteDoctor, updateDoctor } =
    useContext(HospitalContext);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    phone: "",
    specialization: "",
    qualification: "",
    experience: "",
    department: "",
    consultationFee: "",
    available: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "available" ? value === "true" : value,
    }));
  };

  // Add Doctor
  const handleAddDoctor = () => {
    if (!formData.name.trim()) return;

    addDoctor({
      ...formData,
      id: Date.now(),
    });

    resetForm();
  };

  // Edit Doctor
  const handleEditDoctor = (doctor) => {
    setFormData(doctor);
    setIsEditing(true);
  };

  // Update Doctor
  const handleUpdateDoctor = () => {
    updateDoctor(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      phone: "",
      specialization: "",
      qualification: "",
      experience: "",
      department: "",
      consultationFee: "",
      available: true,
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-3xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center shadow-lg">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Doctors Management 👨‍⚕️
          </h1>
          <p className="text-teal-100">
            Add, update and manage doctor details easily.
          </p>
        </div>

        <div className="w-40 md:w-60 mt-4 md:mt-0 rounded-xl overflow-hidden shadow-md border border-white/20">
          <img
            src="/doctor5.jpg"
            alt="Doctors"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-10 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          {isEditing ? "Update Doctor" : "Add Doctor"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            value={formData.experience}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="number"
            name="consultationFee"
            placeholder="Consultation Fee"
            value={formData.consultationFee}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <select
            name="available"
            value={formData.available}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>

        </div>

        <div className="mt-6 flex gap-4">
          {!isEditing ? (
            <button
              onClick={handleAddDoctor}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow"
            >
              Add Doctor
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdateDoctor}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow"
              >
                Update
              </button>

              <button
                onClick={resetForm}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Doctor List
        </h2>

        {doctors.length === 0 ? (
          <p className="text-gray-500">No doctors found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {doctors.map((d) => (
              <div
                key={d.id}
                className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-800">{d.name}</h3>

                <p className="text-sm text-gray-600">📞 {d.phone}</p>
                <p className="text-sm text-gray-600">🩺 {d.specialization}</p>
                <p className="text-sm text-gray-600">🎓 {d.qualification}</p>
                <p className="text-sm text-gray-600">⏳ {d.experience} yrs</p>
                <p className="text-sm text-gray-600">🏥 {d.department}</p>
                <p className="text-sm text-gray-600">💰 ₹{d.consultationFee}</p>

                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      d.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {d.available ? "Available" : "Not Available"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditDoctor(d)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteDoctor(d.id)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}