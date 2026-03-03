// import { useContext, useState } from "react";
// import { HospitalContext } from "../context/HospitalContext";

// export default function Appointments() {
//   const {
//     patients,
//     doctors,
//     appointments,
//     bookAppointment,
//     cancelAppointment,
//   } = useContext(HospitalContext);

//   const [patientId, setPatientId] = useState("");
//   const [doctorId, setDoctorId] = useState("");
//   const [time, setTime] = useState("");

//   const selectedDoctor = doctors.find(d => d.id === Number(doctorId));

//   return (
//     <div className="p-6 min-h-screen bg-gray-900 text-gray-100 font-sans">

//       {/* Booking Header */}
//       <h2 className="text-3xl font-extrabold text-cyan-400 drop-shadow-lg mb-6">
//         Book Appointment
//       </h2>

//       {/* Booking Form */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
//         <select
//           className="p-3 rounded-lg border border-cyan-400 text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//           onChange={(e) => setPatientId(Number(e.target.value))}
//         >
//           <option>Select Patient</option>
//           {patients.map((p) => (
//             <option key={p.id} value={p.id}>{p.name}</option>
//           ))}
//         </select>

//         <select
//           className="p-3 rounded-lg border border-cyan-400 text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//           onChange={(e) => setDoctorId(Number(e.target.value))}
//         >
//           <option>Select Doctor</option>
//           {doctors.map((d) => (
//             <option key={d.id} value={d.id}>{d.name}</option>
//           ))}
//         </select>

//         {selectedDoctor && (
//           <select
//             className="p-3 rounded-lg border border-cyan-400 text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//             onChange={(e) => setTime(e.target.value)}
//           >
//             <option>Select Time</option>
//             {selectedDoctor.schedule.map((slot, index) => (
//               <option key={index}>{slot}</option>
//             ))}
//           </select>
//         )}

//         <button
//           className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-lg transition-colors"
//           onClick={() => {
//             if (patientId && doctorId && time)
//               bookAppointment({ patientId, doctorId, time });
//             setPatientId("");
//             setDoctorId("");
//             setTime("");
//           }}
//         >
//           Book
//         </button>
//       </div>

//       {/* Appointment List */}
//       <h2 className="text-3xl font-extrabold text-cyan-400 drop-shadow-lg mb-4">
//         Upcoming Appointments
//       </h2>
//       <div className="flex flex-col gap-4">
//         {appointments.length === 0 && (
//           <p className="text-gray-400 italic">No appointments booked yet.</p>
//         )}
//         {appointments.map((a) => (
//           <div
//             key={a.id}
//             className="flex justify-between items-center bg-gray-800 border-l-4 border-cyan-400 p-4 rounded-lg shadow hover:scale-105 transition-transform"
//           >
//             <div className="space-y-1">
//               <p className="text-lg font-semibold text-cyan-300">
//                 Patient: {patients.find(p => p.id === a.patientId)?.name}
//               </p>
//               <p className="text-gray-300">
//                 Doctor: {doctors.find(d => d.id === a.doctorId)?.name}
//               </p>
//               <p className="text-gray-400 text-sm">Time: {a.time}</p>
//             </div>
//             <button
//               className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-colors"
//               onClick={() => cancelAppointment(a.id)}
//             >
//               Cancel
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }















import { useContext, useState, useEffect } from "react";
import { HospitalContext } from "../context/HospitalContext";

export default function Appointments() {
  const {
    patients,
    doctors,
    appointments,
    bookAppointment,
    cancelAppointment,
  } = useContext(HospitalContext);

  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [time, setTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  // Update selected doctor when doctorId changes
  useEffect(() => {
    const doc = doctors.find((d) => d.id === Number(doctorId));
    setSelectedDoctor(doc);

    if (doc && !doc.available) {
      setSuggestion(
        `⚠️ Doctor "${doc.name}" is unavailable. Please choose another doctor.`
      );
    } else {
      setSuggestion("");
    }
  }, [doctorId, doctors]);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-6 drop-shadow-lg">
        Book Appointment
      </h2>

      {/* Form */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">

        {/* Patient Select */}
        <select
          className="border p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-300 transition-colors duration-300"
          onChange={(e) => setPatientId(Number(e.target.value))}
          value={patientId}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Doctor Select */}
        <select
          className="border p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-300 transition-colors duration-300"
          onChange={(e) => setDoctorId(Number(e.target.value))}
          value={doctorId}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id} disabled={!d.available}>
              {d.name} {d.available ? "" : "(Not Available)"}
            </option>
          ))}
        </select>

        {/* Time Select */}
        {selectedDoctor && selectedDoctor.available && (
          <select
            className="border p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-300 transition-colors duration-300"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            <option value="">Select Time</option>
            {selectedDoctor.schedule?.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        )}

        {/* Book Button */}
        <button
          className={`bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold transition-colors mt-2 md:mt-0 ${
            !patientId || !doctorId || !time || (selectedDoctor && !selectedDoctor.available)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-700"
          }`}
          disabled={!patientId || !doctorId || !time || (selectedDoctor && !selectedDoctor.available)}
          onClick={() => {
            bookAppointment({ patientId, doctorId, time });
            setPatientId("");
            setDoctorId("");
            setTime("");
          }}
        >
          Book
        </button>
      </div>

      {/* Suggestion */}
      {suggestion && (
        <p className="text-yellow-500 dark:text-yellow-300 font-semibold mb-4">
          {suggestion}
        </p>
      )}

      {/* Appointment List */}
      <div className="mt-8 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-4 drop-shadow-lg">
          Appointment List
        </h2>

        {appointments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 italic">No appointments yet.</p>
        )}

        {appointments.map((a) => (
          <div
            key={a.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:scale-105 transition-transform transition-colors duration-300"
          >
            <span className="mb-2 md:mb-0">
              Patient: {patients.find((p) => p.id === a.patientId)?.name} | Doctor:{" "}
              {doctors.find((d) => d.id === a.doctorId)?.name} | Time: {a.time}
            </span>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg transition-colors duration-300"
              onClick={() => cancelAppointment(a.id)}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}