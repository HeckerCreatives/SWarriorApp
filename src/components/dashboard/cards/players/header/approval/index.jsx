import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const PlayersApprovalHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="pah4-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="pah4-title">
          <span className="title">APPROVAL PLAYERS</span>
        </div>
        {/* <div className="text-end pah4-filter">
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
        className="pah4-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="pah4-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default PlayersApprovalHeader;
