/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import { message } from "antd";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { USER_SERVER } from "../../../Config";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        message.error("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div
        mode={props.mode}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div>
          <Link to="/login" className="sign-in-button">
            Sign In
          </Link>
        </div>
        <div>
          <Link to="/register" className="sign-in-button">
            Sign Up
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div
        mode={props.mode}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div>
          <a onClick={logoutHandler} className="sign-in-button">
            Logout
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(RightMenu);
