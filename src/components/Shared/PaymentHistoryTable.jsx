import { FaTrashAlt, FaMoneyCheckAlt } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import Pagination from "./Pagination";

const PaymentHistoryTable = ({
  title = "Payment History",
  payments = [],
  totalPage = 0,
  currentPage,
  setCurrentPage,
  onDelete,
}) => {
  const { userData: dbUser } = useUser();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <div className="overflow-x-auto overflow-y-auto min-h-[70vh] w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 rounded-xl shadow-sm transition-colors">
        <table className="table table-zebra table-pin-rows table-pin-cols w-full text-gray-900 dark:text-gray-100">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th>#</th>
              <th>Donor</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-10">
                  No payment history found
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <td>{index + 1}</td>

                  <td className="whitespace-nowrap">
                    <div className="font-bold">{payment.name}</div>
                  </td>

                  <td className="whitespace-nowrap">{payment.email}</td>

                  <td className="font-semibold text-green-600">
                    {payment.amount}৳
                  </td>
                  <td>
                    <span className="badge badge-success text-white">
                      {payment.status}
                    </span>
                  </td>

                  <td className="text-xs whitespace-nowrap">
                    {payment.transition_id}
                  </td>

                  <td className="whitespace-nowrap">
                    {new Date(payment.created_at).toLocaleDateString()} <br />
                    <span className="text-xs opacity-60">
                      {new Date(payment.created_at).toLocaleTimeString()}
                    </span>
                  </td>

                  <td className="capitalize whitespace-nowrap">
                    <div className="font-bold">
                      {payment.payment_method_types?.[0] === "card" && (
                        <FaMoneyCheckAlt className="inline mr-1 text-blue-500" />
                      )}
                      {payment.payment_method_types?.[0]}
                    </div>
                    <div className="text-sm opacity-60">
                      Holder: {payment.payment_holder}
                    </div>
                  </td>

                  <th>
                    {onDelete && dbUser?.role === "admin" && (
                      <button
                        onClick={() => onDelete(payment)}
                        className="btn btn-error btn-xs text-white"
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </th>
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th>#</th>
              <th>Donor</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-5">
        {/* Pagination */}
        {totalPage > 0 && (
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
