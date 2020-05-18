import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import "./GridCard.css";

function GridCard(props) {
  if (props.actor) {
    return (
      <Col lg={6} md={8} sm={12} xs={24}>
        <div style={{ position: "relative" }} className="card">
          <img
            style={{ width: "100%", height: "320px", borderRadius: "5%" }}
            alt=""
            src={props.image}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              color: "#24252A",
              width: "100%",
              height: "50px",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgb(237, 240, 241 , 0.7)",
              paddingLeft: "15px",
              fontWeight: 600,
              borderRadius: "0px 0px 18px 18px",
            }}
          >
            {props.actor}
          </div>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} sm={12} xs={24}>
        <div style={{ position: "relative" }} className="card">
          <Link to={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              alt=""
              src={props.image}
            />
          </Link>
        </div>
      </Col>
    );
  }
}

export default GridCard;
