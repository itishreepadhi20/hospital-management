import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";

export default function Patients() {
  const { patients, addPatient, dischargePatient } = useContext(HospitalContext);
  const [name, setName] = useState("");

  const handleAddPatient = () => {
    if (!name.trim()) return;
    addPatient({ name: name.trim(), discharged: false });
    setName("");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Patient Management
        </h1>
        <p className="text-gray-400 mt-2">
          Add new patients and manage discharge status.
        </p>
      </div>

      {/* Add Patient Card */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-amber-400 mb-4">
          Add New Patient
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white
                       border border-gray-600
                       focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            onClick={handleAddPatient}
            className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-500
                       text-gray-900 font-semibold shadow-md
                       transition"
          >
            Add Patient
          </button>
        </div>
      </div>

      {/* Patient List Card */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-amber-400 mb-6">
          Patient List
        </h2>

        {patients.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">
              No patients registered.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Add patients using the form above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between
                           bg-gray-700 rounded-xl px-5 py-4
                           hover:shadow-md transition"
              >
                {/* Patient Info */}
                <div className="mb-3 md:mb-0">
                  <h3 className="text-lg font-semibold text-white">
                    {patient.name}
                  </h3>
                </div>

                {/* Status + Action */}
                <div className="flex items-center gap-4">

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-1 text-sm font-semibold rounded-full ${
                      patient.discharged
                        ? "bg-red-900 text-red-300"
                        : "bg-green-900 text-green-300"
                    }`}
                  >
                    {patient.discharged ? "Discharged" : "Admitted"}
                  </span>

                  {/* Discharge Button */}
                  {!patient.discharged && (
                    <button
                      onClick={() => dischargePatient(patient.id)}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700
                                 text-white text-sm font-medium
                                 transition"
                    >
                      Discharge
                    </button>
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