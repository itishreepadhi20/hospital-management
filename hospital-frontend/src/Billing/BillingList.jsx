import React from "react";

const BillingList = () => {
  const bills = [
    { id: 1, patient: "Rahul Sharma", amount: "₹5000", status: "Paid" },
    { id: 2, patient: "Anita Das", amount: "₹3000", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Billing List</h1>

      <div className="bg-white shadow-md rounded-xl p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-4">Bill ID</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-b">
                <td className="py-3 px-4">{bill.id}</td>
                <td className="py-3 px-4">{bill.patient}</td>
                <td className="py-3 px-4">{bill.amount}</td>
                <td className={`py-3 px-4 font-medium ${bill.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                  {bill.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingList;