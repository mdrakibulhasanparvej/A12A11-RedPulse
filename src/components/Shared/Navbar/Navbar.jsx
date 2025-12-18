import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/Logo.png";
import avatarImg from "../../../assets/avater.jpg";
// import Container from "../../ui/Container";
import React, { useEffect, useState } from "react";
import { PiCarSimpleFill, PiPhoneCallFill } from "react-icons/pi";
import {
  IoAddCircle,
  IoBookmarks,
  IoHome,
  IoLogIn,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { FaListAlt } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdSpaceDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import MyLinks from "./MyLinks";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();
  //   const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("🎉 Log out successful!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(`An Error: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      });
  };

  const links = (
    <>
      <li>
        <MyLinks to="/">Home</MyLinks>
      </li>
      <li>
        <MyLinks to="/aboutus">About Us</MyLinks>
      </li>
      <li>
        <MyLinks to="/contactus">Find Blood</MyLinks>
      </li>
    </>
  );
  const links2 = (
    <>
      <li>
        <MyLinks to="/dashboard">Dashborad</MyLinks>
      </li>
    </>
  );

  // <div className="fixed w-full bg-white z-10 shadow-sm">
  //   <div className="py-4 ">
  //     <Container>
  //       <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
  //         {/* Logo */}
  //         <Link to="/">
  //           <img src={logo} alt="logo" className="w-[50%] h-[50%]" />
  //         </Link>
  //         {/* Dropdown Menu */}
  //         <div className="relative">
  //           <div className="flex flex-row items-center gap-3">
  //             {/* Dropdown btn */}
  //             <div
  //               onClick={() => setIsOpen(!isOpen)}
  //               className="p-4 md:py-1 md:px-2 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:transition"
  //             >
  //               <div className="hidden md:block">
  //                 {/* Avatar */}
  //                 <img
  //                   className="rounded-full"
  //                   referrerPolicy="no-referrer"
  //                   src={user && user.photoURL ? user.photoURL : avatarImg}
  //                   alt="profile"
  //                   height="30"
  //                   width="30"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           {isOpen && (
  //             <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
  //               <div className="flex flex-col cursor-pointer">
  //                 <Link
  //                   to="/"
  //                   className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
  //                 >
  //                   Home
  //                 </Link>

  //                 {user ? (
  //                   <>
  //                     <Link
  //                       to="/dashboard"
  //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
  //                     >
  //                       Dashboard
  //                     </Link>
  //                     <div
  //                       onClick={logOut}
  //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
  //                     >
  //                       Logout
  //                     </div>
  //                   </>
  //                 ) : (
  //                   <>
  //                     <Link
  //                       to="/login"
  //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
  //                     >
  //                       Login
  //                     </Link>
  //                     <Link
  //                       to="/signup"
  //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
  //                     >
  //                       Sign Up
  //                     </Link>
  //                   </>
  //                 )}
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </Container>
  //   </div>
  // </div>

  return (
    <div className="relative dark:bg-gray-800 ">
      <div className="navbar bg-white dark:bg-gray-800 text-gray-800 dark:text-white sticky top-0 z-50 pr-5 md:px-10 border-b border-gray-300 shadow-md">
        <div className="navbar-start  ">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="-pl-5 btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu bg-white dark:bg-gray-800 menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="md:text-2xl flex items-center font-extrabold">
            <span>
              <img
                src={logo}
                className="w-4 h-4  md:w-10 md:h-10 mr-6 md:mr-2"
                alt="rent_wheels_logo"
              />
            </span>
            RED
            <span className="bg-linear-to-r from-[#6A0B37] to-[#B32346] bg-clip-text text-transparent">
              PULSE
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="font-bold menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* new user icon */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end z-50 ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 border-2 border-gray-300 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    referrerPolicy="no-referrer"
                    src={user.photoURL || avatarImg}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu text-gray-800 dark:text-white bg-white dark:bg-gray-800 menu-sm dropdown-content rounded-box z-50 mt-3 w-60 p-2 shadow"
              >
                <div className=" pb-3 border-b border-b-gray-200">
                  <li className="text-sm font-bold">{user.displayName}</li>
                  <li className="text-xs">{user.email}</li>
                </div>
                {links2}
                <div className="px-3 flex gap-2 items-center">
                  <span className="text-xl">
                    <MdLightMode />
                  </span>
                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    defaultChecked={localStorage.getItem("theme") === "dark"}
                    className="toggle"
                  />
                  <span className="text-xl">
                    <MdDarkMode />
                  </span>
                </div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn mt-3 btn-xs text-left bg-linear-to-br from-[#6A0B37] to-[#B32346]  text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn rounded-full border-gray-300 btn-xs sm:btn-sm bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white"
              >
                <IoLogIn /> Login
              </Link>
              <Link
                to="/register"
                className="btn rounded-full border-gray-300 btn-xs sm:btn-sm bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
