import DonationRow from "./DonationRow";

const DonationTable = ({ donations }) => {
  console.log(donations);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Blood</th>
            <th>Status</th>
            <th>Donor Info</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {donations.map((donation) => (
            <DonationRow key={donation._id} donation={donation} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationTable;
