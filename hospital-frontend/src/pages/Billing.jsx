import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";
import jsPDF from "jspdf";

export default function Billing() {
  const { patients, bills, generateBill } = useContext(HospitalContext);

  const [patientId, setPatientId] = useState("");
  const [amount, setAmount] = useState("");

  const exportPDF = (bill) => {
    const doc = new jsPDF();
    const patient = patients.find((p) => p.id === bill.patientId);

    doc.setFontSize(18);
    doc.text("🏥 Hospital Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Patient: ${patient?.name}`, 20, 40);
    doc.text(`Amount: ₹${bill.amount}`, 20, 50);
    doc.text(`Date: ${new Date(bill.date).toLocaleDateString()}`, 20, 60);

    doc.save(`Bill_${bill.id}.pdf`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100 font-sans">

      {/* Page Header */}
      <h1 className="text-3xl font-extrabold text-amber-400 drop-shadow-lg mb-6">
        Billing
      </h1>

      {/* Generate Bill Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <select
          onChange={(e) => setPatientId(Number(e.target.value))}
          value={patientId}
          className="p-3 rounded-lg border border-amber-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-300"
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="p-3 rounded-lg border border-amber-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-300"
        />

        <button
          className={`bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-lg transition-colors duration-300 ${
            !patientId || !amount ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!patientId || !amount}
          onClick={() => {
            generateBill(patientId, amount);
            setPatientId("");
            setAmount("");
          }}
        >
          Generate
        </button>
      </div>

      {/* Bills List */}
      <div className="space-y-4">
        {bills.length === 0 && (
          <p className="text-gray-400 italic">No bills generated yet.</p>
        )}

        {bills.map((b) => {
          const patient = patients.find((p) => p.id === b.patientId);
          return (
            <div
              key={b.id}
              className="flex justify-between items-center bg-gray-800 dark:bg-gray-700 border-l-4 border-amber-400 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div>
                <p className="text-lg font-semibold text-amber-300">{patient?.name}</p>
                <p className="text-gray-300">₹{b.amount}</p>
                <p className="text-gray-400 text-sm">{new Date(b.date).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => exportPDF(b)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
              >
                Export PDF
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}