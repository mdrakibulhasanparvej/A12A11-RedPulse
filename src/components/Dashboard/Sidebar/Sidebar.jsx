import { useEffect, useState } from "react";
import { Link } from "react-router";

// Icons
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md";

// Optional: Add a fallback avatar if user.photoURL is missing
import useAuth from "../../../hooks/useAuth";

const Sidebar = () => {
  const { logOut, user } = useAuth();
  const [isActive, setActive] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  // Apply theme to <html> and persist in localStorage
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              {/* Replace with your logo */}
              {/* <img src={logo} alt="logo" width="100" height="100" /> */}
              Logo
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
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden mb-4">
              <img
                alt="User avatar"
                referrerPolicy="no-referrer"
                src={user?.photoURL || avatarImg}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Email */}
            <div className="text-center">
              <div className="text-lg font-semibold text-base-content">
                {user?.displayName || "John Doe"}
              </div>
              <div className="text-sm text-base-content/70">
                {user?.email || "john@example.com"}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Navigation */}
        <div className="flex-1 mt-6">
          <nav className="space-y-2">
            {/* Example Menu Items - Uncomment and customize as needed */}
            {/* <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" /> */}
            {/* <MenuItem icon={FcSettings} label="Profile" address="/dashboard/profile" /> */}

            {/* Placeholder for role-based menu */}
            <div className="text-sm text-gray-500 text-center">
              Menu items go here
            </div>
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
