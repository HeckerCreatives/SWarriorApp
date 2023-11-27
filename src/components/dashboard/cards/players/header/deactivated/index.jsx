import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const PlayersDeactivatedHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="pdh-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="pdh-title">
          <span className="title">DEACTIVATED</span>
        </div>
        {/* <div className="text-end pdh-filter">
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
        className="pdh-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="pdh-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default PlayersDeactivatedHeader;
