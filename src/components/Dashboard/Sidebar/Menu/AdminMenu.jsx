import { FaUserCog } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="All Users" address="all-users" />
      <MenuItem
        icon={BiDonateBlood}
        label="All B. D. Req."
        address="all-blood-donation-request"
      />
      <MenuItem icon={BiDonateBlood} label="Profile" address="profile" />
    </>
  );
};

export default AdminMenu;
