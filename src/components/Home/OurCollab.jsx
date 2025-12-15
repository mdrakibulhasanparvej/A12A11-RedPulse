import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Container from "../ui/Container";

const collaborators = ["NCC", "NSS", "YMCA"];

const OurCollab = () => {
  return (
    <Container>
      <section className="dark:bg-gray-900 text-gray-800 dark:text-white py-10">
        <div className=" mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
            Our Collaborators
          </h2>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10 "
          >
            {collaborators.map((name, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg h-32 flex items-center justify-center text-xl font-semibold shadow-sm mb-3 transition duration-300">
                  {name}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Container>
  );
};

export default OurCollab;
