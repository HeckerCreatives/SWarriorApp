import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const PlayersAgentHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="pah2-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="pah2-title">
          <span className="title">AGENT</span>
        </div>
        {/* <div className="text-end pah2-filter">
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
      {/* <MDBContainer
        fluid
        className="pah2-body d-flex align-items-center justify-content-between py-2"
      >
        <MDBBtn className="pah2-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn>
      </MDBContainer> */}
    </MDBCol>
  );
};

export default PlayersAgentHeader;
