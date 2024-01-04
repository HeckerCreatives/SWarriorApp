// ** React
import { useEffect, useState } from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";
import usePlayerArenaStore from "../../../stores/playerArenaStore";
import { useLocation } from "react-router-dom";

const PreviousOutcomePanel = () => {
  const outcome = usePlayerArenaStore(state => state.previousOutcome);

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
            <span className="text-info">{outcome?.round || "--"}</span>
          </MDBContainer>
          <MDBContainer className="text-center">
            <h5 className="text-white">Outcome</h5>
            <span className="text-primary">{outcome?.outcome || "--"}</span>
          </MDBContainer>
          <MDBContainer className=" text-center">
            <h5 className="text-white">Status</h5>
            <span>{outcome === null ? "finished" : "--"}</span>
          </MDBContainer>
        </MDBCol>
      </MDBContainer>
    </MDBCol>
  );
};

export default PreviousOutcomePanel;
