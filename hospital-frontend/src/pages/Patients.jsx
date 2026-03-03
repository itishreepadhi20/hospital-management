import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";

export default function Patients() {
  const { patients, addPatient, dischargePatient } = useContext(HospitalContext);
  const [name, setName] = useState("");

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100 font-sans">

      {/* Add Patient Section */}
      <h2 className="text-3xl font-extrabold text-amber-400 mb-6 drop-shadow-lg">
        Add Patient
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          className="flex-1 border border-amber-400 rounded-lg p-3 text-gray-900 placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-100
                     transition-colors duration-300"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-amber-400 hover:bg-amber-500 transition-colors text-gray-900 font-bold px-6 py-3 rounded-lg shadow-lg"
          onClick={() => {
            if (name.trim() !== "") addPatient({ name });
            setName("");
          }}
        >
          Add
        </button>
      </div>

      {/* Patient List */}
      <h2 className="text-3xl font-extrabold text-amber-400 mb-4 drop-shadow-lg">
        Patient List
      </h2>

      <div className="flex flex-col gap-3">
        {patients.length === 0 && (
          <p className="text-gray-400 italic">No patients added yet.</p>
        )}

        {patients.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center bg-gray-800 dark:bg-gray-700 
                       border-l-4 border-amber-400 p-4 rounded-lg shadow-lg 
                       hover:scale-105 transition-transform duration-300"
          >
            <span className="text-lg font-semibold text-amber-300">
              {p.name} {p.discharged && "(Discharged)"}
            </span>

            {!p.discharged && (
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md shadow-md 
                           transition-colors duration-300"
                onClick={() => dischargePatient(p.id)}
              >
                Discharge
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}