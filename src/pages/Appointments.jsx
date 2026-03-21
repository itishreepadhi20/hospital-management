import { useContext, useState, useEffect } from "react";
import { HospitalContext } from "../context/HospitalContext";

export default function Appointments() {
  const {
    doctors,
    appointments,
    bookAppointment,
    cancelAppointment,
    addReview,
  } = useContext(HospitalContext);

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const doc = doctors.find((d) => d.id === doctorId);
    setSelectedDoctor(doc);

    if (!doc) {
      setTime("");
      setError("");
      return;
    }

    if (!doc.schedule || doc.schedule.length === 0) {
      setError("No available time slots for this doctor.");
    } else if (!doc.available) {
      setError("Selected doctor is currently unavailable.");
    } else {
      setError("");
    }

    setTime("");
  }, [doctorId, doctors]);

  const handleBooking = () => {
    if (!doctorId || !time || !date) {
      setError("Please fill all fields.");
      setSuccess("");
      return;
    }

    const patientId = "anonymous";
    bookAppointment({ patientId, doctorId, date, time });

    setDoctorId("");
    setTime("");
    setDate("");
    setSelectedDoctor(null);
    setError("");
    setSuccess("Your booking is successful!");
  };

  const handleAddReview = (appointmentId) => {
    if (rating === 0 || reviewText.trim() === "") return;

    addReview(appointmentId, rating, reviewText.trim());
    setRating(0);
    setReviewText("");
    setSuccess("Review submitted successfully!");
    setError("");
  };

  return (
    <div className="p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-3xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center shadow-lg">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Appointment Booking 📅
          </h1>
          <p className="text-teal-100">
            Book and manage appointments easily.
          </p>
        </div>

        <div className="w-40 md:w-60 mt-4 md:mt-0 rounded-xl overflow-hidden shadow-md border border-white/20">
          <img
            src="/appointment.avif"
            alt="Appointments"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* BOOK FORM */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-10 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Book Appointment
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option
                key={d.id}
                value={d.id}
                disabled={!d.available || d.schedule.length === 0}
              >
                {d.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          />

          {selectedDoctor && selectedDoctor.available && selectedDoctor.schedule.length > 0 && (
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Time</option>
              {selectedDoctor.schedule.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={handleBooking}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow"
          >
            Book Appointment
          </button>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-600">{success}</p>}
      </div>

      {/* LIST */}
      <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Appointment List
        </h2>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {appointments.map((a) => {
              const doc = doctors.find((d) => d.id === a.doctorId);

              return (
                <div
                  key={a.id}
                  className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {doc?.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    📅 {a.date} | ⏰ {a.time}
                  </p>

                  <p className="text-sm text-gray-600">
                    Status: {a.status || "Pending"}
                  </p>

                  {/* REVIEW (UNCHANGED LOGIC) */}
                  {a.review ? (
                    <div className="mt-3 bg-green-100 text-green-700 p-3 rounded-lg">
                      ⭐ {a.review.rating}/5 <br />
                      💬 {a.review.text}
                    </div>
                  ) : (
                    <div className="mt-3 space-y-2">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        placeholder="Rating (1-5)"
                        className="px-3 py-2 border rounded-lg w-24"
                      />

                      <input
                        type="text"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review"
                        className="px-3 py-2 border rounded-lg w-full"
                      />

                      <button
                        onClick={() => handleAddReview(a.id)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => cancelAppointment(a.id)}
                    className="mt-4 text-red-500 hover:text-red-600 font-medium"
                  >
                    Cancel Appointment
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}