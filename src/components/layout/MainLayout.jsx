import React from "react";
import NavBar from "../shared/NavBar";
// import Footer from "../shared/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="pt-16 text-black font-SfProDisplay bg-cust-pink-lightest">
      <NavBar />
      {children}
      {/* <Footer/> */}
    </div>
  );
};

export default MainLayout;
