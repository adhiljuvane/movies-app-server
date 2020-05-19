import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import { Link } from "react-router-dom";
import RightMenu from "./Sections/RightMenu";
import { FcDebian } from "react-icons/fc";
import "./Sections/Navbar.css";

function NavBar() {
  return (
    <div className="header">
      <Link to="/" className="logo">
        <FcDebian style={{ fontSize: "80px" }} />
        Carpe Diem
      </Link>
      <div className="menu">
        <LeftMenu />
        <RightMenu />
      </div>
    </div>
  );
}

export default NavBar;
