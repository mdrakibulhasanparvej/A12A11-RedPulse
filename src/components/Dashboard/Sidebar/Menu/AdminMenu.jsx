import { FaPaypal, FaUserCog } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="All Users" address="all-users" />
      <MenuItem
        icon={BiDonateBlood}
        label="All Blood Requests"
        address="all-blood-donation-request"
      />
      <MenuItem
        icon={FaPaypal}
        label={"Payment History"}
        address={"payment-history"}
      />
      <MenuItem icon={FaUserCog} label="Profile" address="profile" />
    </>
  );
};

export default AdminMenu;
