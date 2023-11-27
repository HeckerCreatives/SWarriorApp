import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React from "react";

const ArenaDrawAmount = () => {
  return (
    <MDBContainer fluid className="px-0 mb-2">
      <MDBContainer fluid className="p-1 arena-status-header text-center">
        <span>DRAW PRICE</span>
      </MDBContainer>
      <MDBContainer fluid className="pt-1 pb-1 arena-status-body">
        <MDBTypography tag="h3" className="text-center m-0">
          1,500.00
        </MDBTypography>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ArenaDrawAmount;
