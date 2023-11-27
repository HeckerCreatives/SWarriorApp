import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const CommsByDateHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="cbd-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="cbd-title">
          <span className="title">ARENA COMMISSIONS BY DATE</span>
          <br />
          {/* <span className="sub">
            PLEASE CLICK ON THE FILTER BUTTON BELOW TO START
          </span> */}
        </div>
        {/* <div className="text-end cbd-filter">
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
        className="cbd-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="cbd-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default CommsByDateHeader;
