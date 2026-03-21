import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";
import jsPDF from "jspdf";

export default function Billing() {
  const { patients, bills, generateBill, deleteBill } =
    useContext(HospitalContext);

  const [patientId, setPatientId] = useState("");
  const [amount, setAmount] = useState("");

  // Currency Formatter
  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN")}`;

  // Export PDF
  const exportPDF = (bill) => {
    const doc = new jsPDF();
    const patient = patients.find((p) => String(p.id) === String(bill.patientId));

    doc.setFontSize(20);
    doc.text("Hospital Invoice", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Patient Name: ${patient?.name || "N/A"}`, 20, 40);
    doc.text(`Amount: ${formatCurrency(bill.amount)}`, 20, 50);
    doc.text(`Date: ${new Date(bill.date).toLocaleDateString()}`, 20, 60);

    doc.line(20, 70, 190, 70);
    doc.text("Thank you for choosing our hospital.", 20, 90);

    doc.save(`Invoice_${bill.id}.pdf`);
  };

  // Generate Bill
  const handleGenerate = () => {
    if (!patientId || !amount) return;

    generateBill(Number(patientId), Number(amount));

    setPatientId("");
    setAmount("");
  };

  // Delete confirmation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      deleteBill(id);
    }
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
          <div className="flex flex-col space-y-2 text-slate-700 dark:text-white">
            <label>Choose Patient</label>

            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="border rounded-xl px-4 py-2 bg-white text-black dark:bg-slate-800 dark:text-white border-slate-300 dark:border-slate-700"
            >
              <option value="">Select patient</option>

              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="flex flex-col space-y-2 text-slate-700 dark:text-white">
            <label>Enter Amount</label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₹ 0.00"
              className="border rounded-xl px-4 py-2 bg-white text-black dark:bg-slate-800 dark:text-white border-slate-300 dark:border-slate-700"
            />
          </div>

          {/* Generate Button */}
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={!patientId || !amount}
              className={`w-full rounded-xl px-4 py-2 text-white font-medium
              ${
                !patientId || !amount
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Generate Invoice
            </button>
          </div>

        </div>
      </div>

      {/* ================= BILL LIST ================= */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 dark:border-slate-800">

        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
          Invoice History
        </h2>

        {bills.length === 0 ? (
          <p className="text-lg text-slate-600 dark:text-white">
            No invoices generated yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b text-slate-700 dark:text-white">
                  <th className="py-3">Patient</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Date</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {bills.map((b) => {
                  const patient = patients.find(
                    (p) => String(p.id) === String(b.patientId)
                  );

                  return (
                    <tr
                      key={b.id}
                      className="border-b hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-white"
                    >

                      <td className="py-3">
                        {patient?.name || "Unknown"}
                      </td>

                      <td className="py-3 font-semibold">
                        {formatCurrency(b.amount)}
                      </td>

                      <td className="py-3">
                        {new Date(b.date).toLocaleDateString()}
                      </td>

                      <td className="py-3 text-right space-x-4">

                        {/* Export */}
                        <button
                          onClick={() => exportPDF(b)}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Export PDF
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="text-red-600 font-medium hover:underline"
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