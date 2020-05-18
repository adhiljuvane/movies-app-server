import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function LeftMenu(props) {
  return (
    <div
      mode={props.mode}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "none",
      }}
    >
      <div>
        <Link to="/" className="normal-button">
          Home
        </Link>
      </div>
      <div>
        <Link to="/favourite" className="normal-button">
          Favourites
        </Link>
      </div>
      <div>
        <Link to="/friends" className="normal-button">
          Freinds
        </Link>
      </div>
    </div>
  );
}

export default LeftMenu;
