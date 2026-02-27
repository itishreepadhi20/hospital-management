import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import PatientList from './patients/PatientsList'
import AddPatients from './patients/addPatients'
import PatientDetails from './patients/PatientsDetails'
import DoctorDetails from './Doctors/DoctorDetails'
import DoctorSchedule from './Doctors/DoctorSchedule'
import DoctorList from './Doctors/DoctorList'
import AddDoctor from './Doctors/AddDoctor'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
       <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-center mt-10 text-2xl">
          Welcome to Hospital System
        </h1>
        
      <DoctorList/>
      <DoctorDetails/>
      <DoctorSchedule/>
      <AddDoctor/>
       <PatientList/>
       <AddPatients/>
       <PatientDetails/>
      <Dashboard/>
      <Footer />
      </div>
    </>
  )
}

export default App
