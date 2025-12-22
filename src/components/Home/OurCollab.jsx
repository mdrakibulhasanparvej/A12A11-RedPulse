import React from "react";
import Marquee from "react-fast-marquee";
import Container from "../ui/Container";

// Example hospital logos (replace with real images)
const collaborators = [
  { name: "Apollo Hospital", logo: "/hospitals/apollo.png" },
  { name: "Square Hospital", logo: "/hospitals/square.png" },
  { name: "United Hospital", logo: "/hospitals/united.png" },
  { name: "Labaid Hospital", logo: "/hospitals/labaid.png" },
  { name: "Evercare Hospital", logo: "/hospitals/evercare.png" },
  { name: "Popular Diagnostic", logo: "/hospitals/popular.png" },
  { name: "IBN Sina", logo: "/hospitals/ibnsina.png" },
  { name: "Medinova", logo: "/hospitals/medinova.png" },
  { name: "Bangladesh Medical", logo: "/hospitals/bmch.png" },
  { name: "CMH", logo: "/hospitals/cmh.png" },
];

const OurCollab = () => {
  return (
    <Container>
      <section className="py-14 dark:bg-gray-900 text-gray-800 dark:text-white">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Our <span className="text-[#B32346]">Collaborators</span>
        </h2>

        {/* Marquee */}
        <Marquee
          speed={40}
          pauseOnHover
          gradient={false}
          className="overflow-hidden"
        >
          {collaborators.map((item, idx) => (
            <div
              key={idx}
              className="mx-6 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-sm px-6 py-4 min-w-[160px]"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-14 object-contain mb-2 grayscale hover:grayscale-0 transition"
              />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {item.name}
              </p>
            </div>
          ))}
        </Marquee>

        {/* Tagline */}
        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Trusted by leading hospitals & healthcare organizations
        </p>
      </section>
    </Container>
  );
};

export default OurCollab;
