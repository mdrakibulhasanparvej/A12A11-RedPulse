import Pagination from "./Pagination";

const DonationRequestTable = ({
  title = "All Recent Donation Requests",
  requests = [],
  totalPage = 0,
  currentPage,
  setCurrentPage,
  onView,
  onUpdate,
  onDelete,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <div className="overflow-x-auto min-h-[70vh] w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 rounded-xl shadow-sm transition-colors">
        <table className="table table-zebra table-pin-rows table-pin-cols w-full text-gray-900 dark:text-gray-100">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th>#</th>
              <th>Recipient</th>
              <th>Address</th>
              <th>Hospital</th>
              <th>Blood</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-10">
                  No donation requests found
                </td>
              </tr>
            ) : (
              requests.map((request, index) => (
                <tr
                  key={request._id}
                  className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <td>{index + 1}</td>

                  <td>
                    <div className="font-bold">{request.recipientName}</div>
                  </td>

                  <td className="text-sm">
                    <div>{request.recipientDistrict}</div>
                    <div>{request.recipientUpazila}</div>
                  </td>

                  <td>{request.hospitalName}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.donationDate}</td>
                  <td>{request.donationTime}</td>

                  <td>
                    <span
                      className={`badge ${
                        request.status === "pending"
                          ? "badge-warning"
                          : request.status === "inprogress"
                            ? "badge-info"
                            : "badge-success"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td className="max-w-xs truncate">
                    {request.requestMessage}
                  </td>

                  <th className="flex flex-col space-y-1">
                    {onView && (
                      <button
                        onClick={() => onView(request)}
                        className="btn btn-info btn-xs text-white"
                      >
                        View
                      </button>
                    )}

                    {onUpdate && (
                      <button
                        onClick={() => onUpdate(request)}
                        className="btn btn-warning btn-xs text-white"
                      >
                        Update
                      </button>
                    )}

                    {onDelete && (
                      <button
                        onClick={() => onDelete(request)}
                        className="btn btn-error btn-xs text-white"
                      >
                        Delete
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
              <th>Recipient</th>
              <th>Address</th>
              <th>Hospital</th>
              <th>Blood</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination */}
      {totalPage > 0 && (
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default DonationRequestTable;
