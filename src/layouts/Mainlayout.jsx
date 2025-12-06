import React from "react";
import { Outlet } from "react-router";

const Mainlayout = () => {
  return (
    <div>
      <header>
        <h2>Navbar will go here</h2>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h2>footer text will go here</h2>
      </footer>
    </div>
  );
};

export default Mainlayout;
