import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React from "react";

const ArenaDrawAmount = ({ amount }) => {
  return (
    <MDBContainer
      fluid
      className="w-100 px-0 sppayout-container d-flex align-items-center justify-content-end"
    >
      <div className="px-0 w-75">
        <MDBTypography
          tag="h6"
          className="text-center text-success fw-bolder m-0 py-2"
        >
          {amount}
        </MDBTypography>
      </div>
    </MDBContainer>
  );
};

export default ArenaDrawAmount;
