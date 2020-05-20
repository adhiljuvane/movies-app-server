import React, { useState } from "react";
import { Input, message } from "antd";
import { USER_SERVER } from "../../Config";
import axios from "axios";

const { TextArea } = Input;

function Footer() {
  const [Email, setEmail] = useState("");
  const [Content, setContent] = useState("");

  const onContact = () => {
    console.log("email", Email);
    console.log("Content", Content);
    const data = {
      email: Email,
      content: Content,
    };
    axios.post(`${USER_SERVER}/contactMe`, data).then((response) => {
      if (response.data.success) {
        setEmail("");
        setContent("");
        message.success("Email Sent.");
      } else {
        message.warning("Could not contact");
      }
    });
  };

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
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            height: "inherit",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Leave e-mail here.. "
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "90%",
              borderRadius: "10px",
              marginInline: "20px",
            }}
          />
          <TextArea
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "90%",
              borderRadius: "10px",
              marginInline: "20px",
            }}
            rows={4}
            placeholder="I would love to know what you think."
          />
        </div>
        <div
          className="sign-in-button"
          style={{ backgroundColor: "rgb(36, 37, 42)" }}
          onClick={onContact}
        >
          Contact Me.
        </div>
      </div>
    </div>
  );
}

export default Footer;
