import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const TopPointsHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="tp-header d-flex align-items-center justify-content-between py-3"
      >
        <div className="tp-title">
          <span className="title">
            <MDBIcon fas icon="trophy" /> &nbsp;TOP PLAYERS
          </span>
        </div>
      </MDBContainer>
      <MDBContainer
        fluid
        className="tp-body d-flex align-items-center justify-content-between py-2"
      ></MDBContainer>
    </MDBCol>
  );
};

export default TopPointsHeader;
