import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";

export default function Doctors() {
  const { doctors, addDoctor, deleteDoctor, updateDoctor } = useContext(HospitalContext);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [department, setDepartment] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [available, setAvailable] = useState(true);

  const [editingDoctorId, setEditingDoctorId] = useState(null);

  // Add or update doctor
  const handleAddOrUpdateDoctor = () => {
    if (!name.trim()) return;

    const doctorData = {
      name: name.trim(),
      phone,
      specialization,
      qualification,
      experience,
      department,
      consultationFee,
      available,
    };

    if (editingDoctorId) {
      // Update existing doctor via context
      updateDoctor({ ...doctorData, id: editingDoctorId });
    } else {
      // Add new doctor
      addDoctor(doctorData);
    }

    // Reset form
    setName("");
    setPhone("");
    setSpecialization("");
    setQualification("");
    setExperience("");
    setDepartment("");
    setConsultationFee("");
    setAvailable(true);
    setEditingDoctorId(null);
  };

  // Load doctor data into form for editing
  const handleEditDoctor = (doctor) => {
    setEditingDoctorId(doctor.id);
    setName(doctor.name);
    setPhone(doctor.phone);
    setSpecialization(doctor.specialization);
    setQualification(doctor.qualification);
    setExperience(doctor.experience);
    setDepartment(doctor.department);
    setConsultationFee(doctor.consultationFee);
    setAvailable(doctor.available);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Doctors Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage hospital doctors and their availability status.
        </p>
      </div>

      {/* Add / Edit Doctor Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
          {editingDoctorId ? "Edit Doctor" : "Add New Doctor"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Doctor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Experience (Years)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Consultation Fee"
            value={consultationFee}
            onChange={(e) => setConsultationFee(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value === "true")}
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>

        <button
          onClick={handleAddOrUpdateDoctor}
          className="mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-300"
        >
          {editingDoctorId ? "Update Doctor" : "Add Doctor"}
        </button>
      </div>

      {/* Doctor List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
          Doctor List
        </h2>

        {doctors.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No doctors available. Add doctors using the form above.
          </p>
        ) : (
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{doctor.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">📞 Phone: {doctor.phone}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">🩺 Specialization: {doctor.specialization}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">🎓 Qualification: {doctor.qualification}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">⏳ Experience: {doctor.experience} years</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">🏥 Department: {doctor.department}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">💰 Consultation Fee: ₹{doctor.consultationFee}</p>

                <div className="flex justify-between mt-4 items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      doctor.available
                        ? "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {doctor.available ? "Available" : "Not Available"}
                  </span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditDoctor(doctor)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this doctor?")) deleteDoctor(doctor.id);
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
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