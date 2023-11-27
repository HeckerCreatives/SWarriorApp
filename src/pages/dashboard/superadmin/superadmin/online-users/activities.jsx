import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const Activities = () => {
  return (
    <MDBCol className="ou-card-wrapper p-2 mb-3">
      <MDBContainer fluid className="p-3 ou-card-container">
        <MDBContainer fluid className="px-0 ou-card-header">
          <span>
            <MDBIcon far icon="list-alt" />
            &nbsp;&nbsp;Activities
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 ou-card-body"></MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default Activities;
