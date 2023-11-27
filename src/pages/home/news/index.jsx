import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModal,
  MDBTypography,
  MDBInput,
  MDBFile,
  MDBTextArea,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "./index.css";

import loadingImage from "../../../assets/images/logo.png";
import pic2 from "../../../assets/images/landing/news/image2.png";
import pic3 from "../../../assets/images/landing/news/image3.png";
import pic4 from "../../../assets/images/landing/news/image4.png";
import useAnnouncementStore from "../../../stores/announcementStore";
import { IMAGE_ENDPOINT } from "../../../utility/utils";

const LandingNews = () => {
  const [page, setPage] = useState(1);
  const limit = 3;

  const getNews = useAnnouncementStore(state => state.getRecentAnnouncements);
  const recents = useAnnouncementStore(state => state.recent.announcements);
  const loading = useAnnouncementStore(state => state.loading.recent);
  const totalPages = useAnnouncementStore(state => state.recent.totalPages);
  const prevPage = useAnnouncementStore(state => state.recent.prevPage);
  const nextPage = useAnnouncementStore(state => state.recent.nextPage);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getNews(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getNews(limit, prevPage);
    }
  };

  useEffect(() => {
    getNews(limit, page);
  }, []);

  return (
    <MDBContainer id="news" fluid className="px-0 section-size-3">
      <MDBContainer fluid className="px-0">
        <MDBTypography tag="h2" className="py-4 fw-bold text-center news-title">
          NEWS AND EVENTS
        </MDBTypography>
        <MDBContainer fluid className="px-0">
          <MDBCol>
            {loading ? (
              <div className="text-center">
                <img
                  src={loadingImage}
                  alt={"loading image"}
                  style={{ maxWidth: "25%", maxHeight: "25%" }}
                />
                <h1 className="mt-5">LOADING ANNOUNCEMENTS</h1>
              </div>
            ) : recents.length !== 0 ? (
              <MDBContainer
                fluid
                className="px-0 news-card-container pb-5 text-center"
              >
                {recents.map((news, i) => (
                  <div
                    className="news-card my-3 mx-3"
                    key={`image-${i}`}
                    style={{
                      border: " solid 5px black",
                      height: "700px",
                      width: "400px",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      className="news-card-image"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    >
                      <img
                        src={`${IMAGE_ENDPOINT}${news.image}`}
                        alt={`news-${i}`}
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />

                      <div className="news-card-date">
                        <div className="news-card-date-day">
                          {new Date(news.createdAt).toLocaleDateString(
                            "en-US",
                            { weekday: "short" }
                          )}
                        </div>
                        <div className="news-card-date-my">
                          <span>
                            {new Date(news.createdAt).toLocaleDateString(
                              "en-US",
                              { year: "numeric" }
                            )}
                          </span>
                          <span>
                            {new Date(news.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "long" }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="news-card-title mt-5">{news.title}</div>
                    <div className="news-card-body px-3">
                      {news.description}
                    </div>
                  </div>
                ))}
              </MDBContainer>
            ) : (
              <div
                className="text-center mt-5"
                style={{ marginBottom: "370px" }}
              >
                <h1>NO CURRENT ADMIN ANNOUNCEMENTS</h1>
              </div>
            )}
          </MDBCol>
        </MDBContainer>
      </MDBContainer>

      <MDBContainer
        fluid
        className="mb-3 d-flex align-items-center justify-content-center"
      >
        <button
          onClick={handlePrevPage}
          disabled={prevPage === null || loading}
          className="tp-pager"
          role="button"
        >
          <MDBIcon fas icon="angle-double-left" />
        </button>

        <div className="tp-page">{page}</div>
        <button
          onClick={handleNextPage}
          disabled={nextPage === null || loading}
          className="tp-pager"
          role="button"
        >
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>
    </MDBContainer>
  );
};

export default LandingNews;
