import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
import { message } from "antd";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { REVIEW_SERVER, USER_SERVER } from "../../../Config";

const SingleReview = (props) => {
  const [User, setUser] = useState([]);
  const [Liked, setLiked] = useState(false);
  const [Disliked, setDisliked] = useState(false);

  useEffect(() => {
    const data = {
      id: props.userFrom,
    };

    axios.post(`${USER_SERVER}/user`, data).then((response) => {
      if (response.data.user) {
        setUser(response.data.user);
      }
    });

    const reviewData = {
      userFrom: localStorage.getItem("userId"),
      movieId: props.movieId,
      reviewId: props.reviewId,
    };

    axios.post(`${REVIEW_SERVER}/getLiked`, reviewData).then((response) => {
      if (response.data.liked) {
        setLiked(true);
      }
      if (response.data.disliked) {
        setDisliked(true);
      }
    });
  }, [Liked, Disliked]);

  const liked = () => {
    const data = {
      userFrom: localStorage.getItem("userId"),
      movieId: props.movieId,
      likedReview: props.reviewId,
    };

    axios.post(`${REVIEW_SERVER}/likeOne`, data).then((response) => {
      if (response.data.doc1 && response.data.doc2) {
        setLiked(true);
        message.success("Review Liked");
      }
    });
  };

  const disliked = () => {
    const data = {
      userFrom: localStorage.getItem("userId"),
      movieId: props.movieId,
      likedReview: props.reviewId,
    };

    axios.post(`${REVIEW_SERVER}/dislikeOne`, data).then((response) => {
      if (response.data.doc1 && response.data.doc2) {
        setDisliked(true);
        message.success("Review Disliked");
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#edf0f1",
        borderRadius: "10px",
        padding: "7px",
        margin: "auto",
        width: "80%",
        marginBottom: "5px",
        fontSize: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {User.image ? (
          <img src={User.image} style={{ borderRadius: "50%" }} />
        ) : (
          <BsPerson />
        )}
        <div
          style={{
            marginLeft: "3px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {User.name ? User.name : props.userFrom}
          <div style={{ fontSize: "14px" }}>{props.review.review}</div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "10%",
            justifyContent: "space-evenly",
          }}
        >
          <div>{props.review.likedBy && props.review.likedBy.length}</div>
          {console.log("like", Liked, Disliked)}
          {Liked && (
            <FaRegThumbsUp
              style={{ marginRight: "25px" }}
              style={{ color: "blue" }}
            />
          )}
          {!Liked && !Disliked && (
            <FaRegThumbsUp style={{ marginRight: "25px" }} onClick={liked} />
          )}
          {!Liked && Disliked && (
            <FaRegThumbsUp style={{ marginRight: "25px" }} />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "10%",
            justifyContent: "space-evenly",
          }}
        >
          <div>{props.review.dislikedBy && props.review.dislikedBy.length}</div>
          {Disliked && (
            <FaRegThumbsDown
              style={{ marginRight: "25px" }}
              style={{ color: "red" }}
            />
          )}
          {!Disliked && !Liked && (
            <FaRegThumbsDown
              style={{ marginRight: "25px" }}
              onClick={disliked}
            />
          )}
          {!Disliked && Liked && (
            <FaRegThumbsDown style={{ marginRight: "25px" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
