import React from "react";

const PatientDetails = () => {
  // Dummy Patient Data
  const patient = {
    id: 1,
    name: "Rahul Sharma",
    age: 25,
    gender: "Male",
    disease: "Fever",
    contact: "+91 9876543210",
    address: "Bhubaneswar, Odisha",
    bloodGroup: "O+",
    admittedDate: "27 Feb 2026",
    status: "Under Treatment",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Patient Details
        </h1>

        {/* Patient Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          
          <div>
            <p className="font-semibold">Patient ID:</p>
            <p>{patient.id}</p>
          </div>

          <div>
            <p className="font-semibold">Full Name:</p>
            <p>{patient.name}</p>
          </div>

          <div>
            <p className="font-semibold">Age:</p>
            <p>{patient.age}</p>
          </div>

          <div>
            <p className="font-semibold">Gender:</p>
            <p>{patient.gender}</p>
          </div>

          <div>
            <p className="font-semibold">Disease:</p>
            <p>{patient.disease}</p>
          </div>

          <div>
            <p className="font-semibold">Blood Group:</p>
            <p>{patient.bloodGroup}</p>
          </div>

          <div>
            <p className="font-semibold">Contact:</p>
            <p>{patient.contact}</p>
          </div>

          <div>
            <p className="font-semibold">Admitted Date:</p>
            <p>{patient.admittedDate}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold">Address:</p>
            <p>{patient.address}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold">Status:</p>
            <span className="inline-block mt-1 px-4 py-1 rounded-full text-white bg-blue-600">
              {patient.status}
            </span>
          </div>

        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default PatientDetails;