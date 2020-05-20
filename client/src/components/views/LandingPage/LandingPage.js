import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import { Typography, Row, Result, Button } from "antd";
import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";
const { Title } = Typography;

const LandingPage = () => {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [SearchString, setSearchString] = useState("");
  const [Resest, setReset] = useState(true);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, [Resest]);

  const fetchMovies = (path) => {
    fetch(path)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setCurrentPage(response.page);
        console.log("results", response.results);
      });
  };

  const handleClick = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  const handleSearchClick = () => {
    console.log("hereeree");
    const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${SearchString}&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  const handleSearch = (e) => {
    console.log("val", e.target.value);
    setSearchString(e.target.value);
    var endpoint = "";
    if (e.target.value === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${e.target.value}`;
    }
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
        setCurrentPage(response.page);
      });
  };

  const backHome = () => {
    console.log("ew", !Resest);
    setReset(!Resest);
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
          handleSearch={(e) => handleSearch(e)}
          image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`}
          title={Movies[0].original_title}
          text={Movies[0].overview}
        />
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto", marginBottom: "0px" }}>
        <Title level={2} style={{ color: "white" }}>
          {SearchString === "" ? "Movies By Popular" : "Search Result"}
        </Title>
        <hr />
        {/*Grid cards */}
        <Row gutter={[16, 6]}>
          {Movies.length !== 0 ? (
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`
                  }
                  movieId={movie.id}
                />
              </React.Fragment>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                height: "80vh",
                backgroundColor: "#24252A",
                color: "white",
              }}
            >
              <Result
                status="500"
                title="Empty"
                style={{ color: "white" }}
                subTitle="Sorry, No movies by this name"
                extra={
                  <Button type="primary" onClick={backHome}>
                    Back Home
                  </Button>
                }
              />
            </div>
          )}
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
            onClick={SearchString === "" ? handleClick : handleSearchClick}
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
