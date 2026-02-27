import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import PatientList from './patients/PatientsList'
import AddPatients from './patients/addPatients'
import PatientDetails from './patients/PatientsDetails'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
       <div className="min-h-screen">
        <h1 className="text-center mt-10 text-2xl">
          Welcome to Hospital System
        </h1>
      </div>
       <PatientList/>
       <AddPatients/>
       <PatientDetails/>
      <Dashboard/>
      <Footer />
      
    </>
  )
}

export default App
