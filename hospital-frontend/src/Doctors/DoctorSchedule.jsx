import React from "react";

const DoctorSchedule = () => {
  const schedule = [
    { day: "Monday", time: "10:00 AM - 2:00 PM" },
    { day: "Wednesday", time: "12:00 PM - 4:00 PM" },
    { day: "Friday", time: "9:00 AM - 1:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Schedule</h1>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-4">Day</th>
              <th className="py-3 px-4">Available Time</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{item.day}</td>
                <td className="py-3 px-4">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorSchedule;