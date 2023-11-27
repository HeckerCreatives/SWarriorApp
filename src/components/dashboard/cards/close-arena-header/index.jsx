import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const ClosedArenaHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="closed-arena-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="closed-arena-title">
          <span className="title">CLOSED ARENAS</span>
          <br />
          <span className="sub">LIST OF FINISHED ARENAS</span>
        </div>
        {/* <div className="text-end closed-arena-filter">
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
        className="closed-arena-body d-flex align-items-center justify-content-between py-2"
      ></MDBContainer>
    </MDBCol>
  );
};

export default ClosedArenaHeader;
