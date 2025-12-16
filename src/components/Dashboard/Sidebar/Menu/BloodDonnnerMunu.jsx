import React from "react";
import MenuItem from "./MenuItem";
import { FaUserCog } from "react-icons/fa";

const BloodDonnnerMunu = () => {
  return (
    <div>
      <MenuItem icon={FaUserCog} label="My Donation Req" address="all-users" />
      <MenuItem
        icon={FaUserCog}
        label="Create Donation Req"
        address="all-users"
      />
      <MenuItem icon={FaUserCog} label="Profile" address="profile" />
    </div>
  );
};

export default BloodDonnnerMunu;
