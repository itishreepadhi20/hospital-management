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

    const newPatient = {
      ...formData,
      id: Date.now(),
      discharged: false,
    };

    addPatient(newPatient);
    resetForm();
  };

  const handleEditPatient = (patient) => {
    setFormData({
      id: patient.id,
      name: patient.name || "",
      age: patient.age || "",
      gender: patient.gender || "",
      phone: patient.phone || "",
      address: patient.address || "",
      medicalHistory: patient.medicalHistory || "",
      bloodGroup: patient.bloodGroup || "",
    });
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
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Patient Management</h1>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {isEditing ? "Update Patient" : "Add Patient"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
          >
            <option value="">Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 md:col-span-2"
          />

          <textarea
            name="medicalHistory"
            placeholder="Medical History"
            value={formData.medicalHistory}
            onChange={handleChange}
            rows="3"
            className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 md:col-span-2"
          ></textarea>
        </div>

        <div className="mt-6 flex gap-4">
          {!isEditing ? (
            <button
              onClick={handleAddPatient}
              className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-500 text-black font-semibold"
            >
              Add Patient
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdatePatient}
                className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
              >
                Update Patient
              </button>

              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-700"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Patient List</h2>

        {patients.length === 0 ? (
          <p className="text-gray-400">No patients registered.</p>
        ) : (
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="bg-gray-700 rounded-xl p-5">
                <h3 className="text-lg font-semibold">{patient.name}</h3>
                <p>Age: {patient.age}</p>
                <p>Gender: {patient.gender}</p>
                <p>Blood Group: {patient.bloodGroup}</p>
                <p>Phone: {patient.phone}</p>
                <p>Address: {patient.address}</p>
                <p>Medical History: {patient.medicalHistory}</p>

                <div className="flex gap-3 mt-3">
                  {!patient.discharged && (
                    <>
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => dischargePatient(patient.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                      >
                        Discharge
                      </button>
                    </>
                  )}

                  {patient.discharged && (
                    <>
                      <span className="px-4 py-2 bg-red-900 text-red-300 rounded-full text-sm">
                        Discharged
                      </span>

                      <button
                        onClick={() => deletePatient(patient.id)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
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