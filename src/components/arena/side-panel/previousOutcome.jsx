// ** React
import { useEffect, useState } from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";

const PreviousOutcomePanel = () => {
  return (
    <MDBCol>
      <MDBContainer
        fluid
        className="p-3 mt-4 sppayout-container position-relative"
      >
        <div className="sppayout-label px-3">PREVIOUS RESULT</div>
        <MDBCol className="d-flex">
          <MDBContainer className="text-center">
            <h5 className="text-white">Round</h5>
            <span className="text-info">{1}</span>
          </MDBContainer>
          <MDBContainer className="text-center">
            <h5 className="text-white">Outcome</h5>
            <span className="text-primary">{"WALA"}</span>
          </MDBContainer>
          <MDBContainer className=" text-center">
            <h5 className="text-white">Status</h5>
            <span>--</span>
          </MDBContainer>
        </MDBCol>
      </MDBContainer>
    </MDBCol>
  );
};

export default PreviousOutcomePanel;
