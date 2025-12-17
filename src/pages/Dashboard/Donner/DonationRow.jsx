import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const DonationRow = ({ donation }) => {
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    donationDate,
    donationTime,
    bloodGroup,
    status,
    donorName,
    donorEmail,
  } = donation;

  const updateStatus = async (newStatus) => {
    await axiosSecure.patch(`/donations/${_id}`, {
      status: newStatus,
    });
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    await axiosSecure.delete(`/donations/${_id}`);
    toast.success("Donation request deleted");
  };

  return (
    <tr>
      <td>{recipientName}</td>
      <td>
        {recipientDistrict}, {recipientUpazila}
      </td>
      <td>{donationDate}</td>
      <td>{donationTime}</td>
      <td>{bloodGroup}</td>

      <td>
        <span className="badge badge-outline">{status}</span>
      </td>

      <td>
        {status === "inprogress" ? (
          <div className="text-sm">
            <p>{donorName}</p>
            <p className="text-gray-500">{donorEmail}</p>
          </div>
        ) : (
          "-"
        )}
      </td>

      <td className="space-x-1">
        {status === "inprogress" && (
          <>
            <button
              onClick={() => updateStatus("done")}
              className="btn btn-xs btn-success"
            >
              Done
            </button>
            <button
              onClick={() => updateStatus("canceled")}
              className="btn btn-xs btn-error"
            >
              Cancel
            </button>
          </>
        )}

        <Link
          to={`/dashboard/edit-donation/${_id}`}
          className="btn btn-xs btn-warning"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="btn btn-xs btn-outline btn-error"
        >
          Delete
        </button>

        <Link to={`/donation-requests/${_id}`} className="btn btn-xs btn-info">
          View
        </Link>
      </td>
    </tr>
  );
};

export default DonationRow;
