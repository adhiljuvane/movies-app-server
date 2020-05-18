import React, { useEffect, useState } from "react";
import "./PublicProfile.css";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";
import { USER_SERVER, FAVOURITE_SERVER } from "../../Config";
var _ = require("lodash");

function PublicProfile(props) {
  const [User, setUser] = useState([]);
  const [Favourites, setFavourites] = useState([]);
  const [Friends, setFriends] = useState([]);

  useEffect(() => {
    getUser().then(getFavourites());
  }, [props.match.params]);

  const getUser = async () => {
    const data = {
      id: props.match.params.id,
    };
    await axios.post(`${USER_SERVER}/user`, data).then((response) => {
      if (response.data.user) {
        setUser(response.data.user);
        getFriends(response.data.user);
      } else {
        message.error("user fetch failed");
      }
    });
  };

  const getFavourites = async () => {
    const data = {
      userFrom: props.match.params.id,
    };

    await axios
      .post(`${FAVOURITE_SERVER}/getFavouriteMovies`, data)
      .then((response) => {
        if (response.data.success) {
          setFavourites(response.data.favourites);
          // console.log("favourites", response.data.favourites);
        } else {
          message.error("Favourite movies fetch failed");
        }
      });
  };

  const getFriends = (user) => {
    let friends = [];
    // console.log("fr", user.friends);
    user.friends.forEach(async (item) => {
      const data = {
        id: item.user,
      };
      await axios.post(`${USER_SERVER}/user`, data).then((response) => {
        if (response.data.user) {
          friends = _.concat(friends, response.data.user);
        }
      });
      // console.log("frrr", friends);
      setFriends(friends);
    });
  };

  return (
    <div className="user-profile">
      <div className="img-background">
        <img
          src="http://gravatar.com/avatar/1588537104?d=identicon"
          style={{
            borderRadius: "50%",
            border: "1px solid #fff",
            padding: "3px",
          }}
        />
        <div style={{ color: "white", fontWeight: "600", fontSize: "28px" }}>
          {User.name} {User.lastname}
        </div>
        <div>{User.email}</div>
      </div>

      <div
        className="img-background"
        style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
      >
        <div className="title-in-user-profile">Favourites</div>
        <div
          style={{
            width: "100%",
            overflowX: "scroll",
            height: "30vh",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {Favourites &&
            Favourites.map((movie) => {
              return (
                <Link to={`/movie/${movie.movieId}`}>
                  <div style={{ marginRight: "20px", position: "relative" }}>
                    <img
                      style={{ height: "100%" }}
                      src={`http://image.tmdb.org/t/p/w200${movie.movieImage}`}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "rgb(36, 37, 42, 0.5)",
                        width: "100%",
                        paddingLeft: "3px",
                        color: "white",
                      }}
                    >
                      {movie.movieTitle}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      <div
        className="img-background"
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginBottom: "0px",
        }}
      >
        <div className="title-in-user-profile">Friends</div>
        <div
          style={{
            width: "100%",
            overflowX: "scroll",
            height: "30vh",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {Friends &&
            Friends.map((friend) => {
              return (
                <Link to={`/profile/${friend._id}`}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <img src={friend.image} style={{ borderRadius: "10px" }} />
                    <div>{friend.name}</div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
