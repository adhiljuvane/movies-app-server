import React from "react";
import { Typography } from "antd";
import { FiSearch } from "react-icons/fi";

const { Title } = Typography;

function MainImage(props) {
  const handleChange = (e) => {
    props.handleSearch(e);
  };

  return (
    <div
      style={{
        background: `linear-gradient(to bottom , rgba(0,0,0,0) 39% , rgba(0,0,0,0) 41% , rgba(0,0,0,0.65) 100%), url('${props.image}'), #1c1c1c`,
        height: "500px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
          }}
        >
          <Title style={{ color: "white" }} level={2}>
            {props.title}
          </Title>
          <p style={{ color: "white", fontSize: "1rem" }}>{props.text}</p>
        </div>
        <div
          style={{
            color: "#edf0f1",
            borderRadius: "20px",
            border: "1px solid #edf0f1",
            backgroundColor: "#24252a",
            padding: "5px",
            position: "absolute",
            right: "2rem",
            top: "6rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FiSearch style={{ fontSize: "20px", fontWeight: "200" }} />
          <input
            onChange={handleChange}
            placeholder="Search Movies"
            style={{
              backgroundColor: "#24252a",
              border: "none",
              paddingLeft: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MainImage;
