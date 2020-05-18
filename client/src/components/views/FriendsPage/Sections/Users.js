import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
import { Empty, message } from "antd";
import { USER_SERVER } from "../../../Config";

var _ = require("lodash");

const Users = (props) => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(props.users);
  }, [props.users.length]);

  const sendRequest = (user) => {
    const requestData = {
      userFrom: localStorage.getItem("userId"),
      userTo: user._id,
      time: Date.now(),
    };
    axios.post(`${USER_SERVER}/sendRequest`, requestData).then((response) => {
      if (response.data.doc1 && response.data.doc2) {
        message.success("Friend Request Sent");
        props.getPendingRequests();
        props.getAllUsers();
      }
    });
  };

  return (
    <div
      style={{
        width: "100%",
        fontSize: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {_.head(Users) !== undefined ? (
        Users.map((user) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#edf0f1",
                borderRadius: "10px",
                padding: "7px",
                margin: "auto",
                width: "80%",
                marginBottom: "5px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {user.image ? (
                  <img src={user.image} style={{ borderRadius: "50%" }} />
                ) : (
                  <BsPerson />
                )}
                <div style={{ marginInline: "5px" }}>
                  <div>
                    {user.name ? user.name : props.userFrom}{" "}
                    {user.lastname ? user.lastname : props.userFrom}
                  </div>
                  <div>{user.email ? user.email : props.userFrom}</div>
                </div>
              </div>
              <div
                style={{
                  marginLeft: "3px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="sign-in-button"
                  onClick={() => sendRequest(user)}
                >
                  Send Request
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ color: "white" }}
        />
      )}
    </div>
  );
};

export default Users;
