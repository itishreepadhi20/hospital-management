import { createContext, useState, useEffect } from "react";

export const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  // Load doctors from localStorage if available
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem("doctors");
    return saved ? JSON.parse(saved) : [];
  });

  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem("patients");
    return saved ? JSON.parse(saved) : [];
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [bills, setBills] = useState(() => {
    const saved = localStorage.getItem("bills");
    return saved ? JSON.parse(saved) : [];
  });

  // Save doctors to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);

  // Add doctor
  const addDoctor = (doctor) => {
    const newDoctor = { id: Date.now(), ...doctor, schedule: ["10:00", "11:00", "12:00"] };
    setDoctors((prev) => [...prev, newDoctor]);
  };

  //delete doctor
  const deleteDoctor = (id) => {
  setDoctors((prev) => prev.filter((d) => d.id !== id));
};

  // Add patient
  const addPatient = (patient) => {
    const newPatient = { id: Date.now(), ...patient, discharged: false };
    setPatients((prev) => [...prev, newPatient]);
  };

  // Discharge patient
  const dischargePatient = (id) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, discharged: true } : p))
    );
  };

  // Book appointment
  const bookAppointment = ({ patientId, doctorId, time }) => {
    const newAppointment = { id: Date.now(), patientId, doctorId, time };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  // Cancel appointment
  const cancelAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  // Generate bill
  const generateBill = (patientId, amount) => {
    const newBill = { id: Date.now(), patientId, amount: Number(amount), date: new Date() };
    setBills((prev) => [...prev, newBill]);
  };

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