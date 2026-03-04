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

    doc.setFontSize(20);
    doc.text("Hospital Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Patient Name: ${patient?.name || "N/A"}`, 20, 40);
    doc.text(`Amount: ₹${Number(bill.amount).toLocaleString()}`, 20, 50);
    doc.text(
      `Date: ${new Date(bill.date).toLocaleDateString()}`,
      20,
      60
    );

    doc.line(20, 65, 190, 65);
    doc.save(`Invoice_${bill.id}.pdf`);
  };

  const handleGenerate = () => {
    if (!patientId || !amount) return;

    generateBill(patientId, Number(amount));
    setPatientId("");
    setAmount("");
  };

  return (
    <div className="space-y-8">

      {/* ================= BILL GENERATION ================= */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 dark:border-slate-800">

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6">
          Generate Invoice
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Patient Select */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Select Patient
            </label>

            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="border border-slate-300 dark:border-slate-700 
              bg-white dark:bg-slate-800 
              text-slate-800 dark:text-white
              rounded-xl px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Enter Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₹ 0.00"
              className="border border-slate-300 dark:border-slate-700 
              bg-white dark:bg-slate-800 
              text-slate-800 dark:text-white
              rounded-xl px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Generate Button */}
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={!patientId || !amount}
              className="w-full bg-blue-600 hover:bg-blue-700 
              text-white rounded-xl px-4 py-2 font-medium 
              transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Invoice
            </button>
          </div>

        </div>
      </div>

      {/* ================= BILL LIST ================= */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 dark:border-slate-800">

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6">
          Invoice History
        </h2>

        {bills.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No invoices generated yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                  <th className="py-3">Patient</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Date</th>
                  <th className="py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {bills.map((b) => {
                  const patient = patients.find(
                    (p) => p.id === b.patientId
                  );

                  return (
                    <tr
                      key={b.id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <td className="py-3 text-slate-700 dark:text-slate-200">
                        {patient?.name || "Unknown"}
                      </td>

                      <td className="py-3 font-semibold text-slate-800 dark:text-white">
                        ₹{Number(b.amount).toLocaleString()}
                      </td>

                      <td className="py-3 text-slate-600 dark:text-slate-300">
                        {new Date(b.date).toLocaleDateString()}
                      </td>

                      <td className="py-3 text-right">
                        <button
                          onClick={() => exportPDF(b)}
                          className="text-blue-600 hover:text-blue-700 font-medium transition"
                        >
                          Export PDF
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
}