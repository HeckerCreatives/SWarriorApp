import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const CommsWithdrawalLogsFilter = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="cwlf-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="cwlf-title">
          <span className="title">COMMISSION WITHDRAWAL LOGS</span>
          <br />
          <span className="sub">Agent Commission Withdrawals</span>
        </div>
        {/* <div className="text-end cwlf-filter">
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
        className="cwlf-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="cwlf-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn>
        <MDBBtn className="cwlf-export-btn">
          EXPORT <MDBIcon fas icon="plus-square" size="lg" />
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default CommsWithdrawalLogsFilter;
