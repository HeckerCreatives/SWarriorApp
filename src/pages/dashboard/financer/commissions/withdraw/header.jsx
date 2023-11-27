import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const CommsWithdrawalStatus = () => {
  return (
    <MDBCol className="mb-3">
      <MDBContainer
        fluid
        className="cws2-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="cws2-title">
          <span className="title">COMMISSION WITHDRAWAL STATUS</span>
          <br />
          <span className="sub">Recent Commission Withdrawals and Status</span>
        </div>
        <div className="text-end cws2-filter">
          TOTAL RESULTS : 0 <br />
          <MDBIcon
            fas
            icon="redo-alt"
            size="xl"
            className="text-white"
            role="button"
          />
        </div>
      </MDBContainer>
      <MDBContainer
        fluid
        className="cws2-body d-flex align-items-center justify-content-between py-2"
      ></MDBContainer>
    </MDBCol>
  );
};

export default CommsWithdrawalStatus;
