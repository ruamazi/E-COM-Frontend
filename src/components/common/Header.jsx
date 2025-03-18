import React from "react";
import Toolbar from "../layout/Toolbar";
import Navbar from "./Navbar";

const Header = () => {
 return (
  <header className=" border-b border-gray-200">
   <Toolbar />
   <Navbar />
  </header>
 );
};

export default Header;
