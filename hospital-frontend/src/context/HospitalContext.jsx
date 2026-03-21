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

export const HospitalProvider = ({ children }) => {
  /* -------------------------------
     State
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
     Doctor Functions
  -------------------------------- */
  const addDoctor = (doctor) => {
    const newDoctor = {
      id: generateId(),
      ...doctor,
      schedule: ["10:00–11:00", "11:00–12:00", "12:00–13:00"], // example slots
      available: true,
      createdAt: new Date(),
    };
    setDoctors((prev) => [...prev, newDoctor]);
  };

  const updateDoctor = (updatedDoctor) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === updatedDoctor.id ? { ...updatedDoctor } : doc))
    );
  };

  const deleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
  };

  /* -------------------------------
     Patient Functions
  -------------------------------- */
  const addPatient = (patient) => {
    const newPatient = {
      id: generateId(),
      ...patient,
      discharged: false,
      createdAt: new Date(),
    };
    setPatients((prev) => [...prev, newPatient]);
  };

  const dischargePatient = (id) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === id ? { ...patient, discharged: true } : patient
      )
    );
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  /* -------------------------------
     Appointment Functions
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
      createdAt: new Date(),
    };

    setAppointments((prev) => [...prev, newAppointment]);

    // Remove booked time from doctor's schedule
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === doctorId
          ? { ...d, schedule: d.schedule.filter((t) => t !== time) }
          : d
      )
    );
  };

  const cancelAppointment = (id) => {
    const appointmentToCancel = appointments.find((a) => a.id === id);
    if (!appointmentToCancel) return;

    // Remove appointment
    setAppointments((prev) => prev.filter((a) => a.id !== id));

    // Restore time slot to doctor's schedule
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === appointmentToCancel.doctorId
          ? {
              ...d,
              schedule: [...d.schedule, appointmentToCancel.time].sort(),
            }
          : d
      )
    );
  };

  /* -------------------------------
     Billing Functions
  -------------------------------- */
  const generateBill = (patientId, amount) => {
    const newBill = {
      id: generateId(),
      patientId,
      amount: Number(amount),
      date: new Date(),
    };
    setBills((prev) => [...prev, newBill]);
  };

  const deleteBill = (id) => {
    setBills((prev) => prev.filter((bill) => bill.id !== id));
  };


  // Add Review Function
const addReview = (appointmentId, rating, text) => {
  setAppointments(prev =>
    prev.map(a =>
      a.id === appointmentId ? { ...a, review: { rating, text } } : a
    )
  );
};
  /* -------------------------------
     Provider
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
        addReview
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};