import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function LeftMenu() {
  const user = useSelector((state) => state.user);

  if (user.userData && !user.userData.isAuth) {
    return <div></div>;
  } else {
    return (
      <div
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
}

export default withRouter(LeftMenu);
