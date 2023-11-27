import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const PlayersActiveHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="pah3-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="pah3-title">
          <span className="title">ACTIVE PLAYERS</span>
        </div>
        {/* <div className="text-end pah3-filter">
          TOTAL RESULTS : 0 <br />
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
        className="pah3-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="pah3-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default PlayersActiveHeader;
