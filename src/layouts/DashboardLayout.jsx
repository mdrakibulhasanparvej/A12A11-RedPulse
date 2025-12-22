import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

// Icons
import { MdClose, MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";

// Hooks
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

// Components
import MenuItem from "../components/Dashboard/Sidebar/Menu/MenuItem";
import AdminMenu from "../components/Dashboard/Sidebar/Menu/AdminMenu";
import BloodDonnnerMunu from "../components/Dashboard/Sidebar/Menu/BloodDonnnerMunu";
import VolunteerMenu from "../components/Dashboard/Sidebar/Menu/VolunteerMenu";
import SidebarSkeleton from "../components/ui/Loading/Sidebar only/SidebarSkeleton";

// Avatar
import avatarImg from "../assets/avater.jpg";
import logo from "../assets/Logo.png";
import useTitle from "../hooks/useTitle";

const DashboardLayout = () => {
  useTitle("Dashboard");

  const { user, logOut } = useAuth();
  const { userData: dbUser, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  if (isLoading) return <SidebarSkeleton />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="flex h-screen overflow-hidden">
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300
          bg-white dark:bg-gray-800 
          flex flex-col m-4 rounded-xl`}
        >
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center text-white font-bold">
                <img src={logo} className="" alt="rent_wheels_logo" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                RED
                <span className="bg-linear-to-r from-[#6A0B37] to-[#B32346] bg-clip-text text-transparent">
                  PULSE
                </span>
              </h2>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <MdClose className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Menu */}
          <div className="flex-1 mt-6 overflow-y-auto px-3 space-y-2 rounded-xl">
            <MenuItem
              icon={BsGraphUp}
              label="Statistics"
              address="/dashboard"
            />

            {dbUser?.role === "admin" && <AdminMenu />}
            {dbUser?.role === "volunteer" && <VolunteerMenu />}
            {dbUser?.role === "donor" && <BloodDonnnerMunu />}
          </div>

          {/* Logout */}
          <Link
            to="/"
            onClick={logOut}
            className="cursor-pointer px-4 m-4 flex items-center  gap-3 py-3 rounded-lg
            text-gray-700 dark:text-gray-300
            hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <GrLogout />
            Logout
          </Link>
        </aside>

        {/* MAIN */}
        <div className=" mb-4 ml-8 md:ml-4 mx-4 flex-1 flex flex-col overflow-hidden">
          {/* TOP NAV */}
          <header
            className="mt-4 flex items-center justify-between px-6 py-4
          bg-white dark:bg-gray-800 rounded-xl
           border-b border-gray-200 dark:border-gray-700 "
          >
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <MdMenu className="w-7 h-7 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              {/* Theme */}
              <button
                onClick={() => handleTheme(theme !== "dark")}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
              >
                {theme === "dark" ? (
                  <MdDarkMode className="text-yellow-400 w-5 h-5" />
                ) : (
                  <MdLightMode className="text-gray-800 w-5 h-5" />
                )}
              </button>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Hey,{" "}
                    <span className="font-semibold">{user?.displayName}</span>
                  </p>
                  <p className="text-xs text-gray-500">{dbUser?.role}</p>
                </div>
                <img
                  src={user?.photoURL || avatarImg}
                  className="w-10 h-10 rounded-full border-2 border-red-800 object-cover"
                />
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="h-full overflow-y-auto mt-4
                bg-gray-100 dark:bg-gray-900
                text-gray-900 dark:text-gray-100"
              >
                <Outlet />
              </motion.main>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
