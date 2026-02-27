import React from "react";

const PatientList = () => {
  const patients = [
    { id: 1, name: "Rahul Sharma", age: 25, gender: "Male", disease: "Fever" },
    { id: 2, name: "Anita Das", age: 30, gender: "Female", disease: "Diabetes" },
    { id: 3, name: "Suman Patel", age: 45, gender: "Male", disease: "Hypertension" },
    { id: 4, name: "Priya Singh", age: 28, gender: "Female", disease: "Asthma" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Patient List
      </h1>

      {/* Table Container */}
      <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          {/* Table Head */}
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">Disease</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3 px-4">{patient.id}</td>
                <td className="py-3 px-4">{patient.name}</td>
                <td className="py-3 px-4">{patient.age}</td>
                <td className="py-3 px-4">{patient.gender}</td>
                <td className="py-3 px-4">{patient.disease}</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition mr-2">
                    View
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default PatientList;