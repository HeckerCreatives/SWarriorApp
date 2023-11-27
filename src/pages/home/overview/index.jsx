import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "./index.css";
import Slider from "react-slick";
import meron from "../../../assets/images/landing/overview/meron.png";
import wala from "../../../assets/images/landing/overview/wala.png";
import intro from "../../../assets/images/landing/overview/intro.mp4";
import avatar from "../../../assets/images/landing/overview/avatar.png";
import { useNavigate } from "react-router-dom";

const LandingOverview = () => {
  return (
    <MDBContainer
      id="reports"
      fluid
      className="px-0 section-size-2 d-flex align-items-center"
    >
      <MDBContainer className="">
        <MDBContainer fluid className="px-0 lo-panel mt-3">
          <MDBRow className="mx-0">
            <MDBCol
              xxl={6}
              xl={6}
              lg={5}
              md={3}
              className="d-flex align-items-center"
            >
              <MDBTypography
                tag="h4"
                className="m-0 px-2 px-lg-4 px-xl-5 py-3 lo-draw-earnings"
              >
                Arena Earnings:{" "}
                {/* {downloadFinish ? (
                  updateEnabler ? (
                    arenaTotalEarningUpdate
                  ) : (
                    arenaTotalEarning
                  )
                ) : (
                  <div className="spinner-border text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )} */}
              </MDBTypography>
            </MDBCol>
            <MDBCol xxl={6} xl={6} lg={7} md={9}>
              <MDBContainer
                fluid
                className="px-0 lo-timer-panel d-flex align-items-center"
              >
                <div className="lo-timer lo-timer-days">
                  <MDBTypography tag="h6" className="m-0">
                    {/* {updateEnabler
                      ? updatedDurationTimeline.days
                      : durationTimeline.days} */}
                  </MDBTypography>
                  <span>Days</span>
                </div>
                <div className="lo-timer lo-timer-hrs">
                  <MDBTypography tag="h6" className="m-0">
                    {/* {updateEnabler
                      ? updatedDurationTimeline.hours
                      : durationTimeline.hours} */}
                  </MDBTypography>
                  <span>Hours</span>
                </div>
                <div className="lo-timer lo-timer-mins">
                  <MDBTypography tag="h6" className="m-0">
                    {/* {updateEnabler
                      ? updatedDurationTimeline.minutes
                      : durationTimeline.minutes} */}
                  </MDBTypography>
                  <span>Minutes</span>
                </div>
                <div className="lo-timer lo-timer-secs">
                  <MDBTypography tag="h6" className="m-0">
                    {/* {updateEnabler
                      ? updatedDurationTimeline.seconds
                      : durationTimeline.seconds} */}
                  </MDBTypography>
                  <span>Seconds</span>
                </div>
                <div className="">
                  <MDBBtn
                    className="lo-timer-btn shadow-0 "
                    onClick={() => navigate("/login")}
                  >
                    Bet Now
                  </MDBBtn>
                </div>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBContainer fluid className="px-0 lo-report-container my-5">
          <MDBRow className="mx-0 px-0">
            <MDBCol xxl={6} xl={6} lg={6}>
              <MDBContainer fluid className="px-0">
                <MDBTypography tag="h3" className="lo-report-title">
                  GAME REPORT
                </MDBTypography>
                <div className="lo-result-container py-3 py-lg-5 px-0">
                  <MDBContainer
                    fluid
                    className="px-0 text-center mb-2 lo-result-date"
                  >
                    <h4>
                      {/* {updateEnabler
                        ? updatedGameReportArena.eventName
                        : liveArenaFirstIdx.eventName} */}
                    </h4>
                    <span>
                      {/* {updateEnabler
                        ? new Date(
                            updatedGameReportArena.createdAt
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : new Date(
                            liveArenaFirstIdx.createdAt
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })} */}
                    </span>
                  </MDBContainer>
                  <MDBRow className="mx-0 my-4 h-100">
                    <MDBCol size={6}>
                      <MDBContainer
                        fluid
                        className="px-0 d-flex align-items-center justify-content-center"
                      >
                        <img
                          src={meron}
                          alt="alt"
                          className="img-fluid me-lg-4 me-1"
                        />
                        <div className="text-center">
                          <MDBTypography
                            tag="h1"
                            className="lo-result-score m-0 pt-2 lo-result-win"
                          >
                            {/* {downloadFinish ? (
                              updateEnabler ? (
                                updatedMeronOutcome
                              ) : (
                                allMeronOutcome
                              )
                            ) : (
                              <div
                                className="spinner-border text-center"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            )} */}
                          </MDBTypography>
                          <div className="lo-result-score-label">Meron</div>
                        </div>
                      </MDBContainer>
                    </MDBCol>
                    <MDBCol size={6}>
                      <MDBContainer
                        fluid
                        className="px-0 d-flex align-items-center justify-content-center"
                      >
                        <div className="text-center">
                          <MDBTypography
                            tag="h1"
                            className="lo-result-score m-0 pt-2"
                          >
                            {/* {downloadFinish ? (
                              updateEnabler ? (
                                updatedWalaOutcome
                              ) : (
                                allWalaOutcome
                              )
                            ) : (
                              <div
                                className="spinner-border text-center"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            )} */}
                          </MDBTypography>
                          <div className="lo-result-score-label">Wala</div>
                        </div>

                        <img
                          src={wala}
                          alt="alt"
                          className="img-fluid ms-lg-4 ms-1"
                        />
                      </MDBContainer>
                    </MDBCol>
                  </MDBRow>
                  <MDBContainer fluid className="px-0 text-center mt-3">
                    <MDBBtn className="lo-btn-readmore shadow-0">Draws</MDBBtn>
                  </MDBContainer>
                </div>
              </MDBContainer>
            </MDBCol>
            <MDBCol xxl={6} xl={6} lg={6}>
              <div className="lo-report-vid-container p-2 d-flex align-items-center h-100">
                <video width="100%" height="100%" controls autoPlay={false}>
                  <source src={intro} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBContainer fluid className="px-0 pb-5 mt-5">
          {/* <Slider {...settings}>
            {liveArenas.map((arena, i) => (
              <MDBCol
                className="px-3 mx-0"
                key={`overview-card-${i}`}
                onClick={() => handleArena(arena.id)}
              >
                <div className="overview-card py-3 d-flex align-items-center justify-content-center">
                  <div className="overview-card-img me-3">
                    <img src={avatar} alt="avatar" className="img-fluid" />
                  </div>
                  <div className="overview-card-details">
                    <div className="overview-card-title">ARENA {i + 1}</div>
                    <div className="overview-card-sub">{arena.eventName}</div>
                    <div className="overview-card-date">
                      {new Date(arena.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </MDBCol>
            ))}
          </Slider> */}
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  );
};

export default LandingOverview;
