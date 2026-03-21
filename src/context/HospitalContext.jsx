import { createContext, useState, useEffect } from "react";

export const HospitalContext = createContext();

/* -------------------------------
   Utility: Safe LocalStorage Loader
-------------------------------- */
const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading ${key} from storage`, error);
    return [];
  }
};

/* -------------------------------
   Utility: Save to LocalStorage
-------------------------------- */
const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/* -------------------------------
   Provider Component
-------------------------------- */
export const HospitalProvider = ({ children }) => {
  /* -------------------------------
     State Initialization
  -------------------------------- */
  const [doctors, setDoctors] = useState(() => loadFromStorage("doctors"));
  const [patients, setPatients] = useState(() => loadFromStorage("patients"));
  const [appointments, setAppointments] = useState(() =>
    loadFromStorage("appointments")
  );
  const [bills, setBills] = useState(() => loadFromStorage("bills"));

  /* -------------------------------
     Persist State Automatically
  -------------------------------- */
  useEffect(() => saveToStorage("doctors", doctors), [doctors]);
  useEffect(() => saveToStorage("patients", patients), [patients]);
  useEffect(() => saveToStorage("appointments", appointments), [appointments]);
  useEffect(() => saveToStorage("bills", bills), [bills]);

  /* -------------------------------
     Helper: Generate Unique ID
  -------------------------------- */
  const generateId = () => crypto.randomUUID();

  /* -------------------------------
     Doctor Management
  -------------------------------- */
  const addDoctor = (doctor) => {
    const newDoctor = {
      id: generateId(),
      ...doctor,
      schedule: ["10:00–11:00", "11:00–12:00", "12:00–13:00"],
      available: true,
      createdAt: new Date().toISOString(),
    };
    setDoctors((prev) => [...prev, newDoctor]);
  };

  const updateDoctor = (updatedDoctor) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === updatedDoctor.id ? { ...updatedDoctor } : d))
    );
  };

  const deleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  /* -------------------------------
     Patient Management
  -------------------------------- */
  const addPatient = (patient) => {
    const newPatient = {
      id: generateId(),
      ...patient,
      discharged: false,
      createdAt: new Date().toISOString(),
    };
    setPatients((prev) => [...prev, newPatient]);
  };

  const dischargePatient = (id) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, discharged: true } : p))
    );
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  /* -------------------------------
     Appointment Management
  -------------------------------- */
  const bookAppointment = ({ patientId, doctorId, time, date }) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (!doctor) return;

    const newAppointment = {
      id: generateId(),
      patientId,
      doctorId,
      date,
      time,
      department: doctor.department,
      status: "Scheduled",
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [...prev, newAppointment]);

    // Remove booked slot
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === doctorId
          ? { ...d, schedule: d.schedule.filter((t) => t !== time) }
          : d
      )
    );
  };

  const cancelAppointment = (id) => {
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) return;

    setAppointments((prev) => prev.filter((a) => a.id !== id));

    // Restore doctor's slot
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === appointment.doctorId
          ? { ...d, schedule: [...d.schedule, appointment.time].sort() }
          : d
      )
    );
  };

  /* -------------------------------
     Billing Management
  -------------------------------- */
  const generateBill = (patientId, amount) => {
    const newBill = {
      id: generateId(),
      patientId,
      amount: Number(amount),
      date: new Date().toISOString(),
    };
    setBills((prev) => [...prev, newBill]);
  };

  const deleteBill = (id) => {
    setBills((prev) => prev.filter((b) => b.id !== id));
  };

  /* -------------------------------
     Reviews
  -------------------------------- */
  const addReview = (appointmentId, rating, text) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId ? { ...a, review: { rating, text } } : a
      )
    );
  };

  /* -------------------------------
     Context Provider
  -------------------------------- */
  return (
    <HospitalContext.Provider
      value={{
        doctors,
        patients,
        appointments,
        bills,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        addPatient,
        dischargePatient,
        deletePatient,
        bookAppointment,
        cancelAppointment,
        generateBill,
        deleteBill,
        addReview,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};