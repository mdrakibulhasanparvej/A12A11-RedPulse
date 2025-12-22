import React from "react";
import Container from "../ui/Container";
import { FaSearch, FaUserCheck, FaHeartbeat } from "react-icons/fa";
import { IoHeartCircleOutline } from "react-icons/io5";

const steps = [
  {
    id: 1,
    title: "Submit a Blood Request",
    text: "Create a blood request by providing patient details, blood group, and hospital information.",
    icon: <FaSearch className="text-3xl text-white" />,
  },
  {
    id: 2,
    title: "Get Matched with Donors",
    text: "Nearby eligible donors are notified instantly and can respond to your request.",
    icon: <FaUserCheck className="text-3xl text-white" />,
  },
  {
    id: 3,
    title: "Receive Blood & Save Life",
    text: "Once a donor accepts, coordinate with the hospital and receive blood on time.",
    icon: <FaHeartbeat className="text-3xl text-white" />,
  },
];

const HowToGetBlood = () => {
  return (
    <Container>
      <section className="py-16 dark:bg-gray-900 text-gray-800 dark:text-white">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold">
            How to Get <span className="text-[#B32346]">Blood</span>?
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A simple, fast, and reliable process designed to save lives when
            every second matters.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#B32346] flex items-center justify-center">
                {step.icon}
              </div>

              {/* Step Number */}
              <span className="inline-block mb-2 text-sm font-semibold text-[#B32346]">
                Step {step.id}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Heart Message */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#B32346]/10">
            <IoHeartCircleOutline className="h-8 w-8 text-[#B32346] animate-pulse" />
            <span className="text-[#B32346] font-semibold text-sm sm:text-base">
              One request. One donor. One life saved.
            </span>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HowToGetBlood;
