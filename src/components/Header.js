import React from "react";
import styled from "styled-components";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useHistory } from "react-router";
const clientID =
  "319883528243-1q719pb07rg65997hqu1flm1tjlmmel8.apps.googleusercontent.com";
const clientSecret = "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";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);

  const onSuccess = (res) => {
    console.log("Success", res.profileObj);
    let user = res.profileObj;
    dispatch(
      setUserLogin({
        name: user.givenName + user.familyName,
        email: user.email,
        photo: user.imageUrl,
      })
    );
    history.push("/");
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Error", res);
  };

  const signOut = () => {
    dispatch(setSignOut());
    history.push("/login");
  };

  const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

      setTimeout(refreshToken, refreshTiming);
    };
    setTimeout(refreshToken, refreshTiming);
  };

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {!userName ? (
        <LoginContainer>
          <GoogleLogin
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          >
            Login
          </GoogleLogin>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="home" />
              <span>HOME</span>
            </a>
            <a href="/search">
              <img src="/images/search-icon.svg" alt="search" />
              <span>SEARCH</span>
            </a>
            <a href="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="watchlist" />
              <span>WATCHLIST</span>
            </a>
            <a href="/original">
              <img src="/images/original-icon.svg" alt="original" />
              <span>ORIGINALS</span>
            </a>
            <a href="/movies">
              <img src="/images/movie-icon.svg" alt="movie" />
              <span>MOVIES</span>
            </a>
            <a href="/series">
              <img src="/images/series-icon.svg" alt="series" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg src="/images/profile.png" alt="profile" />
          <GoogleLogout clientId={clientID} onLogoutSuccess={signOut}>
            Logout
          </GoogleLogout>
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.div`
  height: 70px;
  background: black;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    display: flex;
    align.-items: center;
    padding: 0 12px;
    cursor: pointer;
    color: white;
    text-decoration: none;

    img {
      height: 20px;
    }
    span {
      font-size: 15px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  padding: 8px 16px;
  border: 1px solid white;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
