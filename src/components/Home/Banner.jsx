import React from "react";
import Container from "../ui/Container";
import { CgArrowRight, CgArrowRightO } from "react-icons/cg";
import Button from "../ui/Button";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section
      className="min-h-screen bg-gradient-to-br from-[#B32346] via-[#6A0B37] to-[#6A0B37] 
                        dark:from-[#6A0B37] dark:via-[#4A0828] dark:to-[#3A0618]
                        py-16 md:py-24 lg:py-15"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Blood Drop Shape */}
          <div className="hidden md:flex justify-center lg:justify-end order-2 lg:order-1">
            <div
              className="w-40 h-48 sm:w-96 sm:h-[500px] lg:w-[350px] lg:h-[455px]
                          bg-gradient-to-b from-[#B32346]/90 to-[#6A0B37]
                          rounded-b-full shadow-2xl
                          -rotate-6 lg:-rotate-12"
            />
          </div>

          {/* Right: Content */}
          <div className="text-center lg:text-left space-y-8 text-white">
            <h1 className="text-3xl sm:text-6xl lg:text-6xl font-black">
              Save Life
              <span
                className="block text-3xl sm:text-7xl lg:text-6xl 
                             bg-gradient-to-r from-white to-gray-200 
                             bg-clip-text text-transparent"
              >
                Donate Blood
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-xl font-medium max-w-2xl mx-auto lg:mx-0">
              Every drop counts. Your blood donation can save up to three lives.
              Be the reason someone gets another tomorrow.
            </p>

            <div className="pt-6 flex gap-5">
              <Link
                to="/register"
                className="btn text-[#B32346] bg-[#6A0B37]/20 dark:text-white dark:bg-linear-to-br from-[#B32346]/70 to-[#6A0B37]/70"
              >
                Join as a donor
              </Link>
              <Link
                to="/search"
                className="btn text-[#B32346] bg-[#6A0B37]/20 dark:text-white dark:bg-linear-to-br from-[#B32346]/70 to-[#6A0B37]/70"
              >
                Search Donors
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
