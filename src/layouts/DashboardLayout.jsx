import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <header>
        <h2>if header then text will go here</h2>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h2>if footer it will go here</h2>
      </footer>
    </div>
  );
};

export default DashboardLayout;
