import React from "react";
import Container from "../ui/Container";
import { PiPencilCircleDuotone } from "react-icons/pi";
import { IoHeartCircleOutline } from "react-icons/io5";

const steps = [
  {
    id: 1,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 3,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const HowToGetBlood = () => {
  return (
    <Container>
      <section className="dark:bg-gray-900 text-gray-800 dark:text-white py-12">
        <div className=" mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
            How to get Blood?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-center">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-pink-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">
                    {step.id}
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-lg shadow-md">
                  <PiPencilCircleDuotone className="h-6 w-6 text-pink-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-800">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Heart graphic */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <IoHeartCircleOutline className="h-8 w-8 text-pink-500 animate-pulse" />
              <span className="text-pink-400 font-semibold">
                ❤️ Blood Connects Us
              </span>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HowToGetBlood;
