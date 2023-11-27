import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const BettingLogsFilter = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="blg-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="blg-title">
          <span className="title">BETTING LOGS</span>
          <br />
          <span className="sub">Player Betting Logs</span>
        </div>
        {/* <div className="text-end blg-filter">
          TOTAL RESULTS : 66 <br />
          <MDBIcon
            fas
            icon="redo-alt"
            size="xl"
            className="text-white"
            role="button"
          />
        </div> */}
      </MDBContainer>
      <MDBContainer
        fluid
        className="blg-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="blg-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn>
        <MDBBtn className="blg-export-btn">
          EXPORT <MDBIcon fas icon="plus-square" size="lg" />
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default BettingLogsFilter;
