import React from "react";

const DoctorList = () => {
  const doctors = [
    { id: 1, name: "Dr. Mehta", specialization: "Cardiologist", experience: "10 Years" },
    { id: 2, name: "Dr. Roy", specialization: "Dermatologist", experience: "7 Years" },
    { id: 3, name: "Dr. Khan", specialization: "Neurologist", experience: "12 Years" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor List</h1>

      <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Specialization</th>
              <th className="py-3 px-4">Experience</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{doc.id}</td>
                <td className="py-3 px-4">{doc.name}</td>
                <td className="py-3 px-4">{doc.specialization}</td>
                <td className="py-3 px-4">{doc.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorList;