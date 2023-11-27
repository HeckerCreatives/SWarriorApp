import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const PaymentModeTable = () => {
  return (
    <MDBCol className="pmf-wrapper p-2 mb-3">
      <MDBContainer fluid className="p-0 pmf-container">
        <MDBContainer fluid className="px-3 py-3 pmf-header">
          <div className="pmf-title">
            <MDBIcon fas icon="university" />
            &nbsp;&nbsp;MY PAYMENT MODES
          </div>
        </MDBContainer>
        <MDBContainer fluid className="p-3 pmf-body"></MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default PaymentModeTable;
