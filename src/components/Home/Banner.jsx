import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Container from "../ui/Container";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import useAuth from "../../hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/banner.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <Container>
      <section className=" min-h-[70vh] text-white py-5 mb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch rounded-xl">
          {/* LEFT BIG BANNER */}
          <div className="rounded-xl lg:col-span-2 bg-white dark:bg-gray-800  flex flex-col md:flex-row items-center gap-6">
            {/* MIDDLE – SWIPER */}
            <div className="w-full h-full">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                speed={1000}
                className="w-full h-full overflow-hidden shadow-lg"
              >
                {data.map((item) => (
                  <SwiperSlide key={item.id || item.title1}>
                    {" "}
                    {/* CRITICAL: Use unique ID, not index! */}
                    <div className=" rounded-xl h-full w-full flex flex-col md:flex-row items-center justify-between p-6  bg-linear-to-br from-[#6a0b37] via-[#B32346] to-[#6a0b37]">
                      {/* Text Content */}
                      <div className="rounded-xl flex flex-col gap-6 max-w-xl text-center md:text-left">
                        <h2 className="font-bold text-xl md:text-2xl leading-tight text-white">
                          {item.title1} <br />
                          <span className="text-white">{item.title2}</span>{" "}
                          {item.title3} <br />
                          {item.title4}
                        </h2>

                        <p className="text-base md:text-sm text-white max-w-md mx-auto md:mx-0">
                          {item.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                          {!user && (
                            <Link
                              to="register"
                              className="btn bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white px-6 py-3 text-center"
                            >
                              Join as Donor
                            </Link>
                          )}

                          <Link
                            to="/search"
                            className="btn bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white px-6 py-3 text-center"
                          >
                            Search Donor
                          </Link>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="rounded-xl w-full md:w-auto flex justify-center md:justify-end mt-8 md:mt-0">
                        <img
                          src={item.image_url}
                          alt={item.title2 || "Delivery service"}
                          className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
                          style={{ maxHeight: "500px" }} // Prevents oversized images from breaking layout
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* RIGHT SIDE – 2 CARDS */}
          <div className="rounded-xl flex flex-col gap-5 justify-between h-full">
            <div className="rounded-xl flex-1 bg-linear-to-r from-[#B32346] to-[#6A0B37] p-6 flex justify-center items-center">
              <img
                src="/donation/blood-donation-save-life-icon-vector-26547407.png"
                className="w-full flex"
              />
            </div>

            <div className="rounded-xl flex-1 bg-linear-to-r from-[#6A0B37] to-[#B32346] flex justify-center items-center">
              <img
                src="/donation/blood-donation.jpg"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Banner;
