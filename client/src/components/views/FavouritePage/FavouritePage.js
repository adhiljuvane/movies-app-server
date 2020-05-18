import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { FAVOURITE_SERVER } from "../../Config";

function FavouritePage() {
  const [favouriteMovies, setfavouriteMovies] = useState([]);

  const columns = [
    {
      title: "Movie Title",
      dataIndex: "movieTitle",
      key: "movieTitle",
      render: (text, record) => (
        <Link to={`/movie/${record.movieId}`}>{text}</Link>
      ),
    },
    {
      title: "Movie RunTime",
      dataIndex: "movieRunTime",
      key: "movieRunTime",
    },
    {
      title: "Remove From Favourites",
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record)}
        >
          <Button>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDelete = (record) => {
    axios
      .post(`${FAVOURITE_SERVER}/removeFromFavourite`, record)
      .then((response) => {
        if (response.data.success) {
          fetchFavouriteMovies();
        } else {
          alert("Failed to remove from favourites");
        }
      });
  };

  const variable = {
    userFrom: localStorage.getItem("userId"),
  };

  useEffect(() => {
    fetchFavouriteMovies();
  }, []);

  const fetchFavouriteMovies = () => {
    axios
      .post(`${FAVOURITE_SERVER}/getFavouriteMovies`, variable)
      .then((response) => {
        if (response.data.success) {
          setfavouriteMovies(response.data.favourites);
        } else {
          alert("failed to get favourites");
        }
      });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh-80px)",
        padding: "80px",
        backgroundColor: "#edf0f1;",
      }}
    >
      <h1 style={{ color: "#24252A" }}>My Favourites</h1>
      <Table dataSource={favouriteMovies} columns={columns} />
    </div>
  );
}

export default FavouritePage;
