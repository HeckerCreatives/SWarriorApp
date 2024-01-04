import React from "react";
import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import useAdminArenaStore from "../../../stores/adminArenaStore";

const SidePanelOutcome = () => {
  const outcome = useAdminArenaStore(state => state.currentRoundOutcome);

  return (
    <MDBCol>
      <MDBContainer
        fluid
        className="p-3 mt-4 sppayout-container position-relative"
      >
        <div className="sppayout-label px-3">CURRENT ROUND OUTCOME:</div>
        <MDBContainer
          fluid
          role="button"
          className={`px-0 py-1 sppayout-btn mb-3 ${
            outcome === "meron"
              ? "bg-success text-white"
              : outcome === "wala"
              ? "bg-danger text-white"
              : outcome === "draw"
              ? "bg-primary text-white"
              : outcome === "cancel" && "bg-white text-black"
          }`}
        >
          <MDBTypography
            tag="h4"
            className="text-center m-2"
            style={{ textTransform: "uppercase" }}
          >
            {outcome}
          </MDBTypography>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelOutcome;
