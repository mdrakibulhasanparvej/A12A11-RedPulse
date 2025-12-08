// OurCollab.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const collaborators = ['NCC', 'NSS', 'YMCA'];

const OurCollab = () => {
  return (
    <section className="bg-gray-900 text-white px-6 py-12 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Our Collaborators</h2>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {collaborators.map((name, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-gray-800 rounded-lg h-32 flex items-center justify-center text-xl font-semibold shadow-md hover:shadow-lg transition duration-300">
                {name}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurCollab;