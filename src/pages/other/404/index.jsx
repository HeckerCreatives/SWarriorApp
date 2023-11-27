import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React from "react";

const NotFound = () => {
  return (
    <MDBContainer
      fluid
      className="px-0 vh-100 d-flex align-items-center justify-content-center"
    >
      <MDBTypography tag="h3" className="text-muted">
        404 Not Found.
      </MDBTypography>
    </MDBContainer>
  );
};

export default NotFound;
