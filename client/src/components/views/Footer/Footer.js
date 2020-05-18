import React from "react";
import { Input } from "antd";

function Footer() {
  return (
    <div
      style={{
        height: "250px",
        backgroundColor: "#0088a9",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <div
        style={{
          width: "30%",
          height: "100%",
          color: "#edf0f1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <h1 style={{ color: "#edf0f1" }}>Carpe Diem</h1>
        <div>
          Dolore incididunt dolore irure ullamco dolor quis ea. Amet in velit
          pariatur dolor nisi cupidatat irure eu tempor dolor pariatur.
          Excepteur occaecat fugiat ullamco mollit sit excepteur ex nostrud
          exercitation.
        </div>
      </div>
      <div
        style={{
          width: "60%",
          height: "100%",
          color: "#edf0f1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "90%",
            justifyContent: "space between",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Leave e-mail here.. "
            style={{
              width: "40%",
              borderRadius: "10px",
              height: "80%",
              marginInline: "20px",
            }}
          />
          <div
            className="sign-in-button"
            style={{ backgroundColor: "rgb(36, 37, 42)" }}
          >
            Subscribe
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
