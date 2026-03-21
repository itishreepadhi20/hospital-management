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

  // Update selected doctor and available times
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

  // Handle Booking
  const handleBooking = () => {
    if (!doctorId || !time || !date) {
      setError("Please fill all fields.");
      setSuccess("");
      return;
    }

    const patientId = "anonymous"; // placeholder
    bookAppointment({ patientId, doctorId, date, time });

    setDoctorId("");
    setTime("");
    setDate("");
    setSelectedDoctor(null);
    setError("");
    setSuccess("Your booking is successful!");
  };

  // Handle Review
  const handleAddReview = (appointmentId) => {
    if (rating === 0 || reviewText.trim() === "") return;

    addReview(appointmentId, rating, reviewText.trim());
    setRating(0);
    setReviewText("");
    setSuccess("Review submitted successfully!");
    setError("");
  };

  return (
    <div className="space-y-8 px-4 md:px-8 py-6">

      {/* BOOK APPOINTMENT */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Book Appointment
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Doctor */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Select Doctor
            </label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose doctor</option>
              {doctors.map((d) => (
                <option
                  key={d.id}
                  value={d.id}
                  disabled={!d.available || d.schedule.length === 0}
                >
                  {d.name} {!d.available ? "(Unavailable)" : d.schedule.length === 0 ? "(No Slots)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Time */}
          {selectedDoctor && selectedDoctor.available && selectedDoctor.schedule.length > 0 && (
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Select Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                  rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Choose time</option>
                {selectedDoctor.schedule.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          )}

          {/* Book Button */}
          <div className="flex items-end">
            <button
              onClick={handleBooking}
              disabled={!doctorId || !time || !date || !!error}
              className="w-full bg-blue-600 hover:bg-blue-700 
                text-white rounded-xl px-4 py-2 font-medium 
                transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 text-sm font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 rounded-lg bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-sm font-medium">
            {success}
          </div>
        )}
      </div>

      {/* APPOINTMENT LIST */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Appointment List
        </h2>

        {appointments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No appointments scheduled yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div key={a.id} className="border p-4 rounded-xl shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">

                <p className="font-semibold text-gray-800 dark:text-gray-100">{doctors.find(d => d.id === a.doctorId)?.name}</p>
                <p className="text-gray-600 dark:text-gray-300">{a.date} at {a.time}</p>
                <p className="text-gray-600 dark:text-gray-300">Status: {a.status || "Pending"}</p>

                {/* Review Section */}
                {a.review ? (
                  <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-gray-800 dark:text-gray-100">
                    <p>⭐ Rating: {a.review.rating}/5</p>
                    <p>💬 Review: {a.review.text}</p>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      placeholder="Rating (1-5)"
                      className="px-3 py-2 rounded-lg border w-1/4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                    <input
                      type="text"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Write your review"
                      className="px-3 py-2 rounded-lg border w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                    <button
                      onClick={() => handleAddReview(a.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Submit Review
                    </button>
                  </div>
                )}

                <button
                  onClick={() => cancelAppointment(a.id)}
                  className="mt-2 text-red-600 hover:text-red-700 font-medium"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}