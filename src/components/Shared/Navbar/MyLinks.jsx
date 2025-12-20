import React from "react";
import { NavLink } from "react-router";

const MyLinks = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${className} text-[#B32346] bg-[#6A0B37]/20 dark:text-white dark:bg-linear-to-br from-[#6A0B37]/70 to-[#B32346]/70 `
          : `${className} font-semibold`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLinks;
