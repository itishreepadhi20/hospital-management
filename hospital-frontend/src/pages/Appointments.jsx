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
  const [error, setError] = useState("");

  useEffect(() => {
    const doc = doctors.find((d) => d.id === doctorId);
    setSelectedDoctor(doc);

    if (doc && doc.available === false) {
      setError("Selected doctor is currently unavailable.");
    } else {
      setError("");
    }
  }, [doctorId, doctors]);

  const handleBooking = () => {
    if (!patientId || !doctorId || !time) return;

    bookAppointment({ patientId, doctorId, time });

    setPatientId("");
    setDoctorId("");
    setTime("");
  };

  return (
    <div className="space-y-8">

      {/* ================= BOOK APPOINTMENT ================= */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 dark:border-slate-800">

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6">
          Book Appointment
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Patient */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Select Patient
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="border border-slate-300 dark:border-slate-700 
              bg-white dark:bg-slate-800 
              text-slate-800 dark:text-white
              rounded-xl px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Select Doctor
            </label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="border border-slate-300 dark:border-slate-700 
              bg-white dark:bg-slate-800 
              text-slate-800 dark:text-white
              rounded-xl px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose doctor</option>
              {doctors.map((d) => (
                <option
                  key={d.id}
                  value={d.id}
                  disabled={d.available === false}
                >
                  {d.name} {d.available === false ? "(Unavailable)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Time */}
          {selectedDoctor && selectedDoctor.available !== false && (
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Select Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-slate-300 dark:border-slate-700 
                bg-white dark:bg-slate-800 
                text-slate-800 dark:text-white
                rounded-xl px-4 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Choose time</option>
                {selectedDoctor.schedule?.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Button */}
          <div className="flex items-end">
            <button
              onClick={handleBooking}
              disabled={!patientId || !doctorId || !time}
              className="w-full bg-blue-600 hover:bg-blue-700 
              text-white rounded-xl px-4 py-2 font-medium 
              transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Appointment
            </button>
          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-medium">
            {error}
          </div>
        )}
      </div>

      {/* ================= APPOINTMENT LIST ================= */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 dark:border-slate-800">

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6">
          Appointment List
        </h2>

        {appointments.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No appointments scheduled yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                  <th className="py-3">Patient</th>
                  <th className="py-3">Doctor</th>
                  <th className="py-3">Time</th>
                  <th className="py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <td className="py-3 text-slate-700 dark:text-slate-200">
                      {patients.find((p) => p.id === a.patientId)?.name}
                    </td>

                    <td className="py-3 text-slate-700 dark:text-slate-200">
                      {doctors.find((d) => d.id === a.doctorId)?.name}
                    </td>

                    <td className="py-3 text-slate-600 dark:text-slate-300">
                      {a.time}
                    </td>

                    <td className="py-3 text-right">
                      <button
                        onClick={() => cancelAppointment(a.id)}
                        className="text-red-600 hover:text-red-700 font-medium transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
}