import React from "react";
import Container from "../ui/Container";

const OurMissionCard = () => {
  return (
    <Container>
      <section className=" dark:bg-gray-900 text-gray-800 dark:text-white py-10">
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-10 rounded-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </section>
    </Container>
  );
};

export default OurMissionCard;
