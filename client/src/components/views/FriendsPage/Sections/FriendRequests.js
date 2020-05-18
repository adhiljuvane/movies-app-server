import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
import { Empty, message } from "antd";
import { USER_SERVER } from "../../../Config";
var _ = require("lodash");

const FriendRequests = (props) => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(props.users);
  }, [props.users.length]);

  const acceptRequest = (user) => {
    // console.log("acceptRequest of", user._id);
    const requestData = {
      userFrom: localStorage.getItem("userId"),
      userTo: user._id,
    };
    axios.post(`${USER_SERVER}/acceptRequest`, requestData).then((response) => {
      if (response.data.doc1 && response.data.doc2) {
        message.success("Friend Request Accepted");
        props.getRequests();
      }
    });
  };

  const rejectRequest = (user) => {
    const requestData = {
      userFrom: localStorage.getItem("userId"),
      userTo: user._id,
    };
    axios.post(`${USER_SERVER}/rejectRequest`, requestData).then((response) => {
      if (response.data.doc1 && response.data.doc2) {
        message.success("Friend Request Rejected");
        window.location.reload();
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
                  onClick={() => acceptRequest(user)}
                >
                  Accept Request
                </div>
                <div
                  className="sign-in-button"
                  onClick={() => rejectRequest(user)}
                >
                  Reject Request
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

export default FriendRequests;
