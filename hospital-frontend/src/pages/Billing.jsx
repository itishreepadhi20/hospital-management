import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";
import jsPDF from "jspdf";

export default function Billing() {
  const { patients, bills, generateBill, deleteBill } =
    useContext(HospitalContext);

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

          <div className="flex flex-col text-white space-y-2">
            <label>Select Patient</label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">Choose patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col text-white space-y-2">
            <label>Enter Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₹ 0.00"
              className="border rounded-xl px-4 py-2"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={!patientId || !amount}
              className="w-full bg-blue-600 text-white rounded-xl px-4 py-2"
            >
              Generate Invoice
            </button>
          </div>

        </div>
      </div>

      {/* ================= BILL LIST ================= */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 dark:border-slate-800">

        <h2 className="text-2xl text-white font-bold mb-6">
          Invoice History
        </h2>

        {bills.length === 0 ? (
          <p className="text-xl text-white">No invoices generated yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b">
                  <th className="py-3 text-white">Patient</th>
                  <th className="py-3 text-white">Amount</th>
                  <th className="py-3 text-white">Date</th>
                  <th className="py-3 text-white text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bills.map((b) => {
                  const patient = patients.find(
                    (p) => p.id === b.patientId
                  );

                  return (
                    <tr key={b.id} className="border-b text-white hover:bg-black">

                      <td className="py-3">
                        {patient?.name || "Unknown"}
                      </td>

                      <td className="py-3 font-semibold">
                        ₹{Number(b.amount).toLocaleString()}
                      </td>

                      <td className="py-3">
                        {new Date(b.date).toLocaleDateString()}
                      </td>

                      <td className="py-3 text-right space-x-4">

                        {/* Export Button */}
                        <button
                          onClick={() => exportPDF(b)}
                          className="text-blue-600 font-medium"
                        >
                          Export PDF
                        </button>

                        {/* ✅ Delete Button */}
                        <button
                          onClick={() => deleteBill(b.id)}
                          className="text-red-600 font-medium"
                        >
                          Delete
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