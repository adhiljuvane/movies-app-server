import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { FAVOURITE_SERVER } from "../../../Config";

const Favourite = (props) => {
  const [FavouriteNumber, setFavouriteNumber] = useState(0);
  const [Favourited, setFavourited] = useState(false);
  const variable = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
  };

  const onClickFavourite = () => {
    if (Favourited) {
      axios
        .post(`${FAVOURITE_SERVER}/removeFromFavourite`, variable)
        .then((response) => {
          if (response.data.success) {
            setFavouriteNumber(FavouriteNumber - 1);
            setFavourited(!Favourited);
          } else {
            alert("Failed to remove from favourites");
          }
        });
    } else {
      axios
        .post(`${FAVOURITE_SERVER}/addToFavourite`, variable)
        .then((response) => {
          console.log("response", response.data);
          if (response.data.success) {
            setFavouriteNumber(FavouriteNumber + 1);
            setFavourited(!Favourited);
          } else {
            alert("Failed to add to favourites");
          }
        });
    }
  };

  useEffect(() => {
    axios.post(`${FAVOURITE_SERVER}/favourited`, variable).then((response) => {
      if (response.data) {
        console.log("data", response.data);
        setFavourited(response.data.favourited);
      } else {
        alert("Failed to get Favourited");
      }
    });

    axios
      .post(`${FAVOURITE_SERVER}/favouriteNumber`, variable)
      .then((response) => {
        console.log("Im here");
        if (response.data.success) {
          setFavouriteNumber(response.data.favouriteNumber);
        } else {
          alert("Failed to get favourites Number");
        }
      });
  }, []);
  return (
    <div
      style={{
        position: "relative",
        float: "right",
        top: "-80px",
        right: "10px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div onClick={onClickFavourite} className="sign-in-button">
        {Favourited ? "Remove from Favourites" : "Add to Favourites"}
      </div>
      <div
        className="sign-in-button"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <AiFillHeart />
        {FavouriteNumber}
      </div>
    </div>
  );
};
export default Favourite;
