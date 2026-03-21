import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";
import jsPDF from "jspdf";

export default function Billing() {
  const { patients, bills, generateBill, deleteBill } =
    useContext(HospitalContext);

  const [patientId, setPatientId] = useState("");
  const [amount, setAmount] = useState("");

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN")}`;

  const exportPDF = (bill) => {
    const doc = new jsPDF();
    const patient = patients.find(
      (p) => String(p.id) === String(bill.patientId)
    );

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

  const handleGenerate = () => {
    if (!patientId || !amount) return;

    generateBill(Number(patientId), Number(amount));
    setPatientId("");
    setAmount("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this invoice?")) {
      deleteBill(id);
    }
  };

  return (
    <div className="p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-3xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center shadow-lg">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Billing & Invoices 💳
          </h1>
          <p className="text-teal-100">
            Generate and manage patient invoices easily.
          </p>
        </div>

        <div className="w-40 md:w-60 mt-4 md:mt-0 rounded-xl overflow-hidden shadow-md border border-white/20">
          <img
            src="/billing.jpg"
            alt="Billing"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* GENERATE BILL */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-10 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Generate Invoice
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
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
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          />

          <button
            onClick={handleGenerate}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow"
          >
            Generate
          </button>
        </div>
      </div>

      {/* BILL LIST */}
      <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Invoice History
        </h2>

        {bills.length === 0 ? (
          <p className="text-gray-500">No invoices found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {bills.map((b) => {
              const patient = patients.find(
                (p) => String(p.id) === String(b.patientId)
              );

              return (
                <div
                  key={b.id}
                  className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {patient?.name || "Unknown"}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    💰 {formatCurrency(b.amount)}
                  </p>

                  <p className="text-sm text-gray-600">
                    📅 {new Date(b.date).toLocaleDateString()}
                  </p>

                  <div className="flex justify-between mt-4">

                    <button
                      onClick={() => exportPDF(b)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                      Export PDF
                    </button>

                    <button
                      onClick={() => handleDelete(b.id)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}