import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const CommissionRequestFilter = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="comreqfilter-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="comreqfilter-title">
          <span className="title">COMMISSION REQUEST</span>
          <br />
          <span className="sub">
            AGENT NETWORK PENDING COMMISSION WITHDRAWALS
          </span>
        </div>
        {/* <div className="text-end comreqfilter-filter">
          TOTAL RESULTS : 4141 <br />
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
        className="comreqfilter-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="comreqfilter-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default CommissionRequestFilter;
