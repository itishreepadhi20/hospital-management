import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";

export default function Patients() {
  const {
    patients,
    addPatient,
    updatePatient,
    dischargePatient,
    deletePatient,
  } = useContext(HospitalContext);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    medicalHistory: "",
    bloodGroup: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPatient = () => {
    if (!formData.name.trim()) return;

    addPatient({
      ...formData,
      id: Date.now(),
      discharged: false,
    });

    resetForm();
  };

  const handleEditPatient = (patient) => {
    setFormData(patient);
    setIsEditing(true);
  };

  const handleUpdatePatient = () => {
    updatePatient(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      medicalHistory: "",
      bloodGroup: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-3xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center shadow-lg">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Patient Management 👨‍⚕️
          </h1>
          <p className="text-teal-100">
            Add, update and manage patient records easily.
          </p>
        </div>

        <img
  src="/patient3.png"
  alt="Patients"
  className="w-40 md:w-60 mt-4 md:mt-0 rounded-xl object-cover shadow-md"
/>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-10 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          {isEditing ? "Update Patient" : "Add Patient"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
            <option>A-</option>
            <option>B-</option>
            <option>O-</option>
            <option>AB-</option>
          </select>

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
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <textarea
            name="medicalHistory"
            placeholder="Medical History"
            value={formData.medicalHistory}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="mt-6 flex gap-4">
          {!isEditing ? (
            <button
              onClick={handleAddPatient}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow"
            >
              Add Patient
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdatePatient}
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
          Patient List
        </h2>

        {patients.length === 0 ? (
          <p className="text-gray-500">No patients found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {patients.map((p) => (
              <div
                key={p.id}
                className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>

                <p className="text-sm text-gray-600">Age: {p.age}</p>
                <p className="text-sm text-gray-600">Gender: {p.gender}</p>
                <p className="text-sm text-gray-600">Blood: {p.bloodGroup}</p>

                <div className="flex gap-3 mt-4">
                  {!p.discharged ? (
                    <>
                      <button
                        onClick={() => handleEditPatient(p)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => dischargePatient(p.id)}
                        className="px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50"
                      >
                        Discharge
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-red-500 font-semibold text-sm">
                        Discharged
                      </span>

                      <button
                        onClick={() => deletePatient(p.id)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}