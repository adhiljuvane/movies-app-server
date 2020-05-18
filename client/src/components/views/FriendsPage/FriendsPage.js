import React, { useEffect, useState } from "react";
import { Typography, Tabs } from "antd";
import Users from "./Sections/Users";
import FriendRequests from "./Sections/FriendRequests";
import PendingRequests from "./Sections/PendingRequests";
import Friends from "./Sections/Friends";
import axios from "axios";
import { USER_SERVER } from "../../Config";

var _ = require("lodash");

const { Title } = Typography;
const { TabPane } = Tabs;

function callback(key) {
  // console.log(key);
}

const FriendsPage = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const [FriendsUsers, setFriendsUsers] = useState([]);
  const [FriendRequestsUsers, setFriendRequests] = useState([]);
  const [PendingUsers, setPendingUsers] = useState([]);
  const [RemainingUsers, setRemainingUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(
      getFriends().then(getRequests().then(getPendingRequests()))
    );
  }, []);

  useEffect(() => {
    var allUsers = AllUsers;
    allUsers = _.differenceWith(allUsers, FriendsUsers, _.isEqual);
    // console.log("after friends", allUsers);
    allUsers = _.differenceWith(allUsers, FriendRequestsUsers, _.isEqual);
    // console.log("after requets", allUsers);
    allUsers = _.differenceWith(allUsers, PendingUsers, _.isEqual); //try disabling the button instead of this
    // console.log("after pending", allUsers);
    setRemainingUsers(allUsers);
  }, [
    AllUsers.length,
    FriendsUsers.length,
    FriendRequestsUsers.length,
    PendingUsers.length,
  ]);

  const getAllUsers = async () => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    await axios.post(`${USER_SERVER}/getAll`, data).then((response) => {
      if (response.data.users) {
        setAllUsers(response.data.users);
        // console.log("all", AllUsers, response.data.users);
      }
    });
  };

  const getFriends = async () => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    var users = [];

    await axios.post(`${USER_SERVER}/user`, data).then((response) => {
      if (response.data.user.friends) {
        response.data.user.friends.forEach((request) => {
          const reqData = {
            id: request.user,
          };
          axios.post(`${USER_SERVER}/user`, reqData).then((response) => {
            if (response.data.user) {
              users = _.concat(users, response.data.user);
              setFriendsUsers(users);
              // console.log("friends", FriendsUsers, users);
            }
          });
        });
      }
    });
  };

  const getRequests = async () => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    var users = [];

    await axios.post(`${USER_SERVER}/user`, data).then((response) => {
      if (response.data.user.friendRequests) {
        response.data.user.friendRequests.forEach((request) => {
          const reqData = {
            id: request.user,
          };
          axios.post(`${USER_SERVER}/user`, reqData).then((response) => {
            if (response.data.user) {
              users = _.concat(users, response.data.user);
              setFriendRequests(users);
              // console.log("requestss", FriendRequestsUsers, users);
            }
          });
        });
      }
    });
  };

  const getPendingRequests = async () => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    var users = [];

    await axios.post(`${USER_SERVER}/user`, data).then((response) => {
      if (response.data.user.pendingRequests) {
        response.data.user.pendingRequests.forEach((request) => {
          const reqData = {
            id: request.user,
          };
          axios.post(`${USER_SERVER}/user`, reqData).then((response) => {
            if (response.data.user) {
              users = _.concat(users, response.data.user);
              setPendingUsers(users);
              // console.log("requestggss", PendingUsers, users);
            }
          });
        });
      }
    });
  };

  return (
    <Tabs
      tabBarStyle={{
        color: "#0088a9",
      }}
      defaultActiveKey="1"
      onChange={callback}
      style={{
        width: "100%",
        height: "calc(100vh-80px)",
        padding: "1rem",
        height: "100vh",
        backgroundColor: "#24252A",
        paddingTop: "80px",
      }}
    >
      <TabPane tab="All Users" key="1">
        <Users
          users={RemainingUsers}
          getPendingRequests={() => getPendingRequests()}
          getAllUsers={() => getAllUsers()}
        />
      </TabPane>
      <TabPane tab="Friends" key="2">
        <Friends users={FriendsUsers} />
      </TabPane>
      <TabPane tab="Friend Requests" key="3">
        <FriendRequests users={FriendRequestsUsers} />
      </TabPane>
      <TabPane tab="Pending Requests" key="4">
        <PendingRequests users={PendingUsers} />
      </TabPane>
    </Tabs>
  );
};

export default FriendsPage;
