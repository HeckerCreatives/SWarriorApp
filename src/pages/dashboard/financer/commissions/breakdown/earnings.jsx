import { MDBCol, MDBContainer, MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import React from "react";

const BreakdownEarnings = () => {
  return (
    <MDBCol className="bec-wrapper mt-3 mb-3">
      <MDBContainer fluid className="px-0">
        <MDBContainer fluid className="bec-container p-3">
          <MDBTypography tag="h5" className="text-center fw-bold text-white">
            <MDBIcon fas icon="percentage" />
            &nbsp;&nbsp;COMMISSIONS EARNINGS
          </MDBTypography>
          <MDBContainer fluid className="bec-value-container py-4 text-white">
            <MDBTypography tag="h1" className="text-center">
              0.00
            </MDBTypography>
            <MDBTypography tag="h6" className="m-0 text-center">
              Total Earnings For November 2022
            </MDBTypography>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default BreakdownEarnings;
