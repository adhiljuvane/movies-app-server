import React, { useState } from "react";
import { Input, message } from "antd";
import { REVIEW_SERVER } from "../../../Config";
import axios from "axios";
const { TextArea } = Input;

const WriteReview = (props) => {
  const [Review, setReview] = useState("");
  const [written, setWritten] = useState(false);

  const onReviewSubmitted = (e) => {
    setWritten(true);
    e.preventDefault();
    const data = {
      userFrom: props.userFrom,
      movieId: props.movieId,
      review: e.target.value,
    };
    axios.post(`${REVIEW_SERVER}/write`, data).then((response) => {
      if (response.data.success) {
        message.success("Review submitted");
      } else {
        message.error("Review error");
      }
    });
    setReview("");
    props.callback();
  };

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
        marginBottom: "0px",
      }}
    >
      <TextArea
        placeholder="writeyour review...."
        rows={3}
        disabled={written}
        value={Review}
        onChange={handleChange}
        onPressEnter={onReviewSubmitted}
        style={{
          borderRadius: "10px",
          padding: "7px",
          margin: "5px auto",
          width: "80%",
        }}
      />
    </div>
  );
};

export default WriteReview;
