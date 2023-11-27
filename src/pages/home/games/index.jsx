import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

import game1 from "../../../assets/images/landing/games/game1.png";
import game2 from "../../../assets/images/landing/games/game2.png";
import game3 from "../../../assets/images/landing/games/game3.png";
import game4 from "../../../assets/images/landing/games/game4.png";
import game5 from "../../../assets/images/landing/games/game5.png";

import discord from "../../../assets/images/landing/games/logo/discord.png";
import instagram from "../../../assets/images/landing/games/logo/instagram.png";
import youtube from "../../../assets/images/landing/games/logo/youtube.png";
import twitch from "../../../assets/images/landing/games/logo/twitch.png";
import twitter from "../../../assets/images/landing/games/logo/twitter.png";
import facebook from "../../../assets/images/landing/games/logo/facebook.png";
import linkedin from "../../../assets/images/landing/games/logo/linkedin.png";

import soon from "../../../assets/images/landing/games/soon.png";
import line from "../../../assets/images/landing/games/div.png";

const LandingGames = () => {
  const icons = [
    discord,
    instagram,
    youtube,
    twitch,
    twitter,
    facebook,
    linkedin,
  ];

  const games = [
    {
      preview: game1,
      available: true,
    },
    {
      preview: game2,
      available: false,
    },
    {
      preview: game3,
      available: false,
    },
    {
      preview: game4,
      available: false,
    },
    {
      preview: game5,
      available: false,
    },
  ];

  return (
    <MDBContainer id="games" fluid className="px-0 section-size-3 games-bg">
      <MDBContainer fluid>
        <MDBTypography tag="h1" className="py-5 text-warning text-center">
          GAMES WE PLAY
        </MDBTypography>
        <MDBContainer fluid className="game-card-container py-5 mb-5">
          {games.map((game, i) => (
            <div className="game-card" key={`game-${i}`}>
              <img src={game.preview} alt="games" className="game-card-img" />
              {!game.available && (
                <img src={soon} alt="coming" className="game-card-soon" />
              )}
            </div>
          ))}
        </MDBContainer>
        <div>
          <img src={line} alt="line" className="img-fluid" />
        </div>
        <MDBRow id="contactus" className="mx-0 pt-4">
          <MDBCol
            xxl={4}
            xl={4}
            lg={4}
            md={4}
            sm={6}
            size={12}
            className="d-flex align-items-center justify-content-center mb-4 px-0 "
          >
            <div>
              <MDBTypography tag="h3" className="games-icon-title">
                FOLLOW US ON SOCIAL:
              </MDBTypography>
              <div className="games-icon-container">
                {icons.map((ico, i) => (
                  <img
                    src={ico}
                    alt="icons"
                    className="img-fluid"
                    key={`icon-${i}`}
                    role="button"
                  />
                ))}
              </div>
            </div>
          </MDBCol>
          <MDBCol
            xxl={4}
            xl={4}
            lg={4}
            md={4}
            sm={6}
            size={12}
            className="d-flex align-items-center justify-content-center text-center mb-4 px-0"
          >
            <div>
              <MDBBtn className="games-terms-btn shadow-0 fs-6 text-dark bg-warning px-5 mb-2">
                SIGN IN
              </MDBBtn>
              <div className="games-terms mb-2">
                <span>Privacy Policy</span> | <span>Terms of Use</span>
              </div>
              <div className="games-copyright">
                &copy; 2022 by Generation Esports
              </div>
            </div>
          </MDBCol>
          <MDBCol
            xxl={4}
            xl={4}
            lg={4}
            md={4}
            sm={6}
            size={12}
            className="d-flex align-items-center justify-content-center mb-4 px-0"
          >
            <div>
              <MDBTypography tag="h3" className="games-icon-title">
                HERE FROM US
              </MDBTypography>
              <div className="games-input-container d-flex align-items-center">
                <div className="form-group me-3">
                  <input
                    type="text"
                    className="form-control games-input-text"
                    placeholder="Enter email"
                  />
                </div>
                <MDBBtn className="games-terms-btn shadow-0 fs-6 text-dark bg-warning px-3 py-1">
                  SUBMIT
                </MDBBtn>
              </div>
              <div className="games-terms-2 mt-2">
                By submitting, you consent to receiving email communication from
                Generation Esports.
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default LandingGames;
