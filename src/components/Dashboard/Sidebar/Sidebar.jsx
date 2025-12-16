import { useEffect, useState } from "react";
import { Link } from "react-router"; // make sure it's react-router-dom
import logo from "../../../assets/Logo.png";

// Icons
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";

// Custom hooks & components
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";

// Optional fallback avatar
import avatarImg from "../../../assets/avater.jpg";
import Volunteer from "./Menu/Volunteer";
import BloodDonnnerMunu from "./Menu/BloodDonnnerMunu";
import SidebarSkeleton from "../../ui/Loading/Sidebar only/SidebarSkeleton";
import useUser from "../../../hooks/useUser";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const { userData: dbUser, isLoading } = useUser();
  const [isActive, setActive] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle mobile sidebar
  const handleToggle = () => setActive(!isActive);

  // Apply theme to <html>
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  if (isLoading) return <SidebarSkeleton />;
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link
              to="/"
              className="md:text-2xl flex items-center font-extrabold"
            >
              <span>
                <img
                  src={logo}
                  className="w-4 h-4 md:w-10 md:h-10 mr-6 md:mr-2"
                  alt="logo"
                />
              </span>
              RED
              <span className="bg-linear-to-r from-[#6A0B37] to-[#B32346] bg-clip-text text-transparent">
                PULSE
              </span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        {/* Top Section - User Info */}
        <div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full ring-2 ring-red-800 ring-offset-base-100 ring-offset-2 overflow-hidden mb-4">
              <img
                alt="User avatar"
                referrerPolicy="no-referrer"
                src={user?.photoURL || avatarImg}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <div className="text-md font-semibold text-base-content">
                {user?.displayName || "John Doe"}
              </div>
              <div className="text-xs text-base-content/70">
                {user?.email || "john@example.com"}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Navigation */}
        <div className="flex-1 mt-6">
          <nav className="space-y-2">
            {/* Common Menu Item */}
            <MenuItem
              icon={BsGraphUp}
              label="Statistics"
              address="/dashboard"
              users={dbUser}
            />

            {/* Role-based Menu */}
            {dbUser?.role === "admin" && <AdminMenu user={dbUser} />}
            {dbUser?.role === "volunteer" && <Volunteer user={dbUser} />}
            {dbUser?.role === "donor" && <BloodDonnnerMunu user={dbUser} />}
          </nav>
        </div>

        {/* Bottom Section - Theme Toggle + Logout */}
        <div className="border-t border-gray-300 pt-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-center gap-4 px-4 py-3">
            <MdLightMode className="text-2xl text-yellow-500" />
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={(e) => handleTheme(e.target.checked)}
              className="toggle toggle-md toggle-primary"
            />
            <MdDarkMode className="text-2xl text-gray-700" />
          </div>

          {/* Logout Button */}
          <button
            onClick={logOut}
            className="flex w-full items-center justify-center gap-3 px-4 py-3 mt-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300"
          >
            <GrLogout className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
