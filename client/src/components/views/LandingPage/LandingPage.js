import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import { Typography, Row } from "antd";
import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";
const { Title } = Typography;

const LandingPage = () => {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (path) => {
    fetch(path)
      .then((response) => response.json())
      .then((response) => {
        console.log("fetch latest", response);
        setMovies([...Movies, ...response.results]);
        setCurrentPage(response.page);
      });
  };

  const handleClick = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };
  return (
    <div
      style={{
        width: "100%",
        margin: 0,
        scrollbarWidth: "none",
        backgroundColor: "#24252A",
      }}
    >
      {Movies[1] && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movies[1].backdrop_path}`}
          title={Movies[1].original_title}
          text={Movies[1].overview}
        />
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto", marginBottom: "0px" }}>
        <Title level={2} style={{ color: "white" }}>
          Movies By Latest
        </Title>
        <hr />
        {/*Grid cards */}
        <Row gutter={[16, 6]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`
                  }
                  movieId={movie.id}
                />
              </React.Fragment>
            ))}
        </Row>

        {/*Load more button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "5px",
            marginBottom: "0px",
          }}
        >
          <button
            onClick={handleClick}
            className="sign-in-button"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
