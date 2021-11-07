import React, { useEffect } from "react";
import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import Viewers from "./Viewers";
import Movies from "./Movies";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";
const axios = require("axios");

function Home() {
  const dispatch = useDispatch();

  const fetchData = React.useCallback(() => {
    
    return axios({
      method: "GET",
      url: "http://localhost:8081/api/movie/get",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(async () => {
    const data = await fetchData();
    dispatch(setMovies(data));
  }, [fetchData]);

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Movies />
    </Container>
  );
}

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;

  &:before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
