import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";

export default function Doctors() {
  const { doctors, addDoctor, deleteDoctor } = useContext(HospitalContext);
  const [name, setName] = useState("");

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-300">

      {/* Add Doctor Section */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-6 drop-shadow-lg">
        Add Doctor
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          className="flex-1 border border-cyan-400 rounded-lg p-3 text-gray-900 placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 
                     bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors duration-300"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-lg transition-colors duration-300"
          onClick={() => {
            if (name.trim() !== "") addDoctor({ name, available: true });
            setName("");
          }}
        >
          Add
        </button>
      </div>

      {/* Doctor List */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-4 drop-shadow-lg">
        Doctor List
      </h2>

      <div className="flex flex-col gap-4">
        {doctors.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 italic">
            No doctors added yet.
          </p>
        )}

        {doctors.map((d) => (
          <div
            key={d.id}
            className="flex justify-between items-center bg-white dark:bg-gray-800 
                       border-l-4 border-cyan-500 p-4 rounded-lg shadow hover:scale-105 
                       transition-transform transition-colors duration-300"
          >
            {/* Doctor Name */}
            <span className="text-lg md:text-xl font-semibold text-cyan-600 dark:text-cyan-300">
              {d.name}
            </span>

            {/* Availability + Warning + Delete */}
            <div className="flex items-center gap-3">

              {/* Availability Badge */}
              <span
                className={`px-3 py-1 rounded font-semibold ${
                  d.available
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
                title={
                  d.available
                    ? "Doctor is available for appointments"
                    : "Doctor is currently unavailable. Please choose another doctor."
                }
              >
                {d.available ? "Available" : "Not Available"}
              </span>

              {/* Warning Icon */}
              {!d.available && (
                <span
                  className="text-yellow-400 text-xl cursor-help"
                  title="Patient cannot book this doctor. Consider another available doctor."
                >
                  ⚠️
                </span>
              )}

              {/* Delete Button */}
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow transition-colors duration-300"
                onClick={() => deleteDoctor(d.id)}
                title="Delete Doctor"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}