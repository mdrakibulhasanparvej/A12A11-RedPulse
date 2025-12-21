const DonationDetailsModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 btn btn-sm btn-circle"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Donation Request Details</h2>

        <div className="space-y-4 text-sm">
          {/* Requester Info */}
          <div>
            <h3 className="font-semibold mb-1 border-b border-gray-200">
              Requester Info
            </h3>

            <p>
              <b>Name:</b> {request.requesterName}
            </p>
            <p>
              <b>Email:</b> {request.requesterEmail}
            </p>
          </div>

          {/* Recipient Info */}
          <div>
            <h3 className="font-semibold mb-1 border-b border-gray-200">
              Recipient Info
            </h3>
            <p>
              <b>Name:</b> {request.recipientName}
            </p>
            <p>
              <b>Location:</b> {request.recipientUnion},{" "}
              {request.recipientUpazila}, {request.recipientDistrict},{" "}
              {request.recipientDivision}
            </p>
            <p>
              <b>Full Address:</b> {request.fullAddress}
            </p>
          </div>

          {/* Donation Info */}
          <div>
            <h3 className="font-semibold mb-1 border-b border-gray-200">
              Donation Info
            </h3>
            <p>
              <b>Blood Group:</b> {request.bloodGroup}
            </p>
            <p>
              <b>Hospital:</b> {request.hospitalName}
            </p>
            <p>
              <b>Date:</b> {request.donationDate}
            </p>
            <p>
              <b>Time:</b> {request.donationTime}
            </p>
          </div>

          {/* Donor Info (only if assigned) */}
          {request.donorEmail && (
            <div>
              <h3 className="font-semibold mb-1 border-b border-gray-200">
                Donor Info
              </h3>
              <p>
                <b>Name:</b> {request.donorName}
              </p>
              <p>
                <b>Email:</b> {request.donorEmail}
              </p>
            </div>
          )}

          {/* Status & Message */}
          <div>
            <h3 className="font-semibold mb-1 border-b border-gray-200">
              Status
            </h3>
            <p>
              <span
                className={`badge ${
                  request.status === "pending"
                    ? "badge-warning text-white"
                    : request.status === "inprogress"
                      ? "badge-info text-white"
                      : request.status === "done"
                        ? "badge-success text-white "
                        : "badge-error text-white "
                }`}
              >
                {request.status}
              </span>
            </p>
            <p>
              <b>Message:</b> {request.requestMessage}
            </p>
          </div>

          {/* Meta */}
          <div className="text-xs text-gray-500">
            <p>
              <b>Created At:</b> {new Date(request.created_at).toLocaleString()}
            </p>
            <p>
              <b>Updated At:</b> {new Date(request.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsModal;
