import { BiDonateBlood } from "react-icons/bi";
import { FaPaypal, FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const VolunteerMenu = () => {
  return (
    <>
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

export default VolunteerMenu;
