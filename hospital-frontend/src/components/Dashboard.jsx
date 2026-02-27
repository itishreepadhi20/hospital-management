import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Patients */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Patients</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">120</p>
        </div>

        {/* Total Doctors */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Doctors</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">25</p>
        </div>

        {/* Appointments */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Appointments Today</h2>
          <p className="text-2xl font-bold text-purple-600 mt-2">18</p>
        </div>

        {/* Revenue */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Today's Revenue</h2>
          <p className="text-2xl font-bold text-red-600 mt-2">₹45,000</p>
        </div>

      </div>

      {/* Recent Activity Section */}
      <div className="mt-10 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Appointments
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Patient Name</th>
              <th className="py-2">Doctor</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Rahul Sharma</td>
              <td className="py-2">Dr. Mehta</td>
              <td className="py-2">27 Feb 2026</td>
              <td className="py-2 text-green-600 font-medium">
                Completed
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Anita Das</td>
              <td className="py-2">Dr. Roy</td>
              <td className="py-2">27 Feb 2026</td>
              <td className="py-2 text-yellow-600 font-medium">
                Pending
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2">Suman Patel</td>
              <td className="py-2">Dr. Khan</td>
              <td className="py-2">27 Feb 2026</td>
              <td className="py-2 text-red-600 font-medium">
                Cancelled
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;