import React from "react";

const DoctorDetails = () => {
  const doctor = {
    id: 101,
    name: "Dr. Amit Mehta",
    specialization: "Cardiologist",
    experience: "10 Years",
    contact: "+91 9876543210",
    email: "amitmehta@email.com",
    availability: "Mon - Sat (10:00 AM - 4:00 PM)",
    status: "Available",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Doctor Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="font-semibold">Doctor ID:</p>
            <p>{doctor.id}</p>
          </div>

          <div>
            <p className="font-semibold">Name:</p>
            <p>{doctor.name}</p>
          </div>

          <div>
            <p className="font-semibold">Specialization:</p>
            <p>{doctor.specialization}</p>
          </div>

          <div>
            <p className="font-semibold">Experience:</p>
            <p>{doctor.experience}</p>
          </div>

          <div>
            <p className="font-semibold">Contact:</p>
            <p>{doctor.contact}</p>
          </div>

          <div>
            <p className="font-semibold">Email:</p>
            <p>{doctor.email}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold">Availability:</p>
            <p>{doctor.availability}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold">Status:</p>
            <span className="inline-block mt-1 px-4 py-1 rounded-full bg-green-600 text-white">
              {doctor.status}
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;