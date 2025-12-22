import React from "react";
import Container from "../ui/Container";
import { FaHeartbeat, FaHandHoldingHeart, FaUsers } from "react-icons/fa";

const OurMissionCard = () => {
  return (
    <Container>
      <section className="py-14 text-gray-800 dark:text-white">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Our <span className="text-[#B32346]">Mission</span>
        </h2>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 md:p-10">
          {/* Icon Row */}
          <div className="flex justify-center gap-6 mb-6 text-[#B32346] text-3xl">
            <FaHeartbeat />
            <FaHandHoldingHeart />
            <FaUsers />
          </div>

          {/* Mission Text */}
          <p className="text-base sm:text-lg leading-relaxed text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            At <span className="font-semibold text-[#B32346]">REDPULSE</span>,
            our mission is to save lives by connecting voluntary blood donors
            with patients in urgent need. We believe that no life should be lost
            due to the unavailability of blood.
          </p>

          <p className="text-base sm:text-lg leading-relaxed text-center text-gray-700 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
            Through awareness, technology, and community-driven support, we aim
            to build a reliable and transparent blood donation network that
            ensures help reaches the right person at the right time.
          </p>

          {/* Highlight */}
          <div className="mt-8 text-center">
            <span className="inline-block px-6 py-2 rounded-full bg-[#B32346]/10 text-[#B32346] font-semibold">
              “One donation can save up to three lives”
            </span>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default OurMissionCard;
