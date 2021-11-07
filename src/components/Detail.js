import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
const axios = require("axios");

function Detail() {
  const { id } = useParams();
  console.log(id, "iddddddddd");

  const [movie, setMovies] = useState();
  const [loader, setLoader] = useState(false);

  const fetchData = React.useCallback(() => {
    return axios({
      method: "GET",
      url: "http://localhost:8081/api/movie/get/one",
      headers: {
        "content-type": "application/json",
      },
      params: {
        id: id,
      },
    })
      .then((response) => {
        console.log(response.data, "******");
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(async () => {
    const data = await fetchData();
    console.log(data, "!!!!!!!");
    if (data) {
      setMovies(data);
      setLoader(true);
    } else console.log("No data found");
  }, []);

  if (loader == true) {
    return (
      <Container>
        <Background>
          <img src={movie.backgroundImg} alt="" />
        </Background>
        <ImageTitle><img src={movie.titleImg} alt="" /></ImageTitle>
        <Controls>
          <PlayButton>
            <img src="/images/play-icon-black.png" alt="" />
            <span>PLAY</span>
          </PlayButton>
          <TrailerButton>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </TrailerButton>
          <AddButton>
            <span>+</span>
          </AddButton>
          <GroupWatchButton>
            <img src="/images/group-icon.png" alt="" />
          </GroupWatchButton>
        </Controls>
        <SubTitle>{movie.subTitle}</SubTitle>
      <Description>{movie.description}</Description>
      </Container>
    );
  }
  else {
    return (
      <></>
    );
  }
}

export default Detail;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageTitle = styled.div`
  height: 30vh;
  min-height: 170px;
  width: 35vw;
  min-width: 200px;
  margin-top: 50px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayButton = styled.button`
  border-radius: 4px;
  font-size: 15px;
  padding: 0 24px;
  margin-right: 22px;
  display: flex;
  align-items: center;
  height: 56px;
  background: rgb(249, 249, 249);
  border: none;
  letter-spacing: 1.8px;
  cursor: pointer;

  &:hover {
    background: rgb(198, 198, 198);
  }
`;
const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  text-transform: uppercase;
`;
const AddButton = styled.button`
  margin-right: 16px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  border: 2px solid white;

  span {
    color: white;
    font-size: 30px;
  }
`;
const GroupWatchButton = styled(AddButton)`
  background: rgb(0, 0, 0);
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 28px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
  max-width: 760px;
`;
