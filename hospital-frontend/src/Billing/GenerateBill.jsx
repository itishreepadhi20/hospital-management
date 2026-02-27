import React, { useState } from "react";

const GenerateBill = () => {
  const [formData, setFormData] = useState({
    patient: "",
    treatment: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Bill Generated Successfully!");
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Generate Bill</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="patient" placeholder="Patient Name"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2" required />

          <input type="text" name="treatment" placeholder="Treatment Details"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2" required />

          <input type="number" name="amount" placeholder="Amount"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2" required />

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Generate Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateBill;