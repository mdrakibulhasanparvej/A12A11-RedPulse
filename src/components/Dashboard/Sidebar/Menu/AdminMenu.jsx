import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="All Users" address="all-users" />
    </>
  );
};

export default AdminMenu;
