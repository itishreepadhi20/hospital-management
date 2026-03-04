import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";

export default function Doctors() {
  const { doctors, addDoctor, deleteDoctor } = useContext(HospitalContext);
  const [name, setName] = useState("");

  const handleAddDoctor = () => {
    if (!name.trim()) return;
    addDoctor({ name: name.trim(), available: true });
    setName("");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Doctors Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage hospital doctors and their availability status.
        </p>
      </div>

      {/* Add Doctor Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Add New Doctor
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Doctor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 
                       dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAddDoctor}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700
                       text-white font-semibold shadow-md
                       transition-all duration-300"
          >
            Add Doctor
          </button>
        </div>
      </div>

      {/* Doctor List Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
          Doctor List
        </h2>

        {doctors.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No doctors available.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Add doctors using the form above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between
                           bg-gray-50 dark:bg-gray-700
                           rounded-xl px-5 py-4 shadow-sm
                           hover:shadow-md transition"
              >
                {/* Doctor Info */}
                <div className="mb-3 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {doctor.name}
                  </h3>
                </div>

                {/* Status + Actions */}
                <div className="flex items-center gap-4">

                  {/* Availability Badge */}
                  <span
                    className={`px-4 py-1 text-sm font-semibold rounded-full ${
                      doctor.available
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {doctor.available ? "Available" : "Not Available"}
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteDoctor(doctor.id)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700
                               text-white text-sm font-medium
                               transition"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}