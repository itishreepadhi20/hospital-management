import React from "react";

const AppointmentList = () => {
  const appointments = [
    { id: 1, patient: "Rahul Sharma", doctor: "Dr. Mehta", date: "27 Feb 2026", status: "Completed" },
    { id: 2, patient: "Anita Das", doctor: "Dr. Roy", date: "28 Feb 2026", status: "Pending" },
    { id: 3, patient: "Suman Patel", doctor: "Dr. Khan", date: "1 Mar 2026", status: "Cancelled" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Appointment List</h1>

      <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{appt.id}</td>
                <td className="py-3 px-4">{appt.patient}</td>
                <td className="py-3 px-4">{appt.doctor}</td>
                <td className="py-3 px-4">{appt.date}</td>
                <td
                  className={`py-3 px-4 font-medium ${
                    appt.status === "Completed"
                      ? "text-green-600"
                      : appt.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {appt.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;