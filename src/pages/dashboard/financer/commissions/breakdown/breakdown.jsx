import React from "react";
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

const CommissionBreakdown = () => {
  return (
    <MDBCol className="cbd2-wrapper">
      <MDBContainer fluid className="px-0 cbd2-container">
        <MDBContainer
          fluid
          className="p-3 cbd2-header d-flex align-items-center justify-content-between"
        >
          <span>
            <MDBIcon fas icon="list" />
            &nbsp;&nbsp;COMMISSION BREAKDOWN
          </span>
          <span>TOTAL RESULTS: 0</span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 cbd2-body py-3 text-center">
          No Results :(
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default CommissionBreakdown;
