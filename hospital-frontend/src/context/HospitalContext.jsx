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
      schedule: ["10:00", "11:00", "12:00"],
      createdAt: new Date(),
    };
    setDoctors((prev) => [...prev, newDoctor]);
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

  /* -------------------------------
     Appointment Functions
  -------------------------------- */
  const bookAppointment = ({ patientId, doctorId, time }) => {
    const newAppointment = {
      id: generateId(),
      patientId,
      doctorId,
      time,
      createdAt: new Date(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
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
        deleteDoctor,
        addPatient,
        dischargePatient,
        bookAppointment,
        cancelAppointment,
        generateBill,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};










// import { createContext, useState } from "react";

// export const HospitalContext = createContext();

// export const HospitalProvider = ({ children }) => {
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [bills, setBills] = useState([]);

//   // Add Patient
//   const addPatient = (patient) => {
//     setPatients([
//       ...patients,
//       { ...patient, id: Date.now(), discharged: false, joined: new Date() },
//     ]);
//   };

//   // Discharge
//   const dischargePatient = (id) => {
//     setPatients(
//       patients.map((p) =>
//         p.id === id ? { ...p, discharged: true } : p
//       )
//     );
//   };

//   // Add Doctor with Schedule
//   const addDoctor = (doctor) => {
//     setDoctors([
//       ...doctors,
//       {
//         ...doctor,
//         id: Date.now(),
//         available: true,
//         schedule: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"],
//       },
//     ]);
//   };

//   // Book Appointment
//   const bookAppointment = ({ patientId, doctorId, time }) => {
//     const conflict = appointments.find(
//       (a) => a.doctorId === doctorId && a.time === time
//     );
//     if (conflict) return alert("Slot already booked");

//     setAppointments([
//       ...appointments,
//       { id: Date.now(), patientId, doctorId, time },
//     ]);
//   };

//   const cancelAppointment = (id) => {
//     setAppointments(appointments.filter((a) => a.id !== id));
//   };

//   // Billing
//   const generateBill = (patientId, amount) => {
//     setBills([
//       ...bills,
//       {
//         id: Date.now(),
//         patientId,
//         amount: Number(amount),
//         date: new Date(),
//       },
//     ]);
//   };

//   return (
//     <HospitalContext.Provider
//       value={{
//         patients,
//         doctors,
//         appointments,
//         bills,
//         addPatient,
//         dischargePatient,
//         addDoctor,
//         bookAppointment,
//         cancelAppointment,
//         generateBill,
//       }}
//     >
//       {children}
//     </HospitalContext.Provider>
//   );
// };