import React from "react";
import Banner from "../../components/Home/Banner";
import OurMissionCard from "../../components/Home/OurMissionCard";
import OurCollab from "../../components/Home/OurCollab";
import HowToGetBlood from "../../components/Home/HowToGetBlood";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner />
      <OurMissionCard />
      <OurCollab />
      <HowToGetBlood />
    </div>
  );
};

export default Home;
