import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React from "react";

const SidePanelPayout = () => {
  return (
    <MDBCol>
      <MDBContainer
        fluid
        className="p-3 mt-4 sppayout-container position-relative"
      >
        <div className="sppayout-label px-3">PAYOUT</div>
        <MDBContainer
          fluid
          role="button"
          className="px-0 py-1 sppayout-btn sppayout-btn-wala mb-3"
        >
          <MDBTypography tag="h4" className="text-center m-0">
            WALA
          </MDBTypography>
          <div className="sppayout-bets sppayout-bets-wala text-center">
            850.25
          </div>
        </MDBContainer>
        <MDBContainer
          fluid
          role="button"
          className="px-0 py-1 sppayout-btn sppayout-btn-meron sppayout-btn-inactive"
        >
          <MDBTypography tag="h4" className="text-center m-0">
            MERON
          </MDBTypography>
          <div className="sppayout-bets sppayout-bets-meron text-center">
            850.25
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelPayout;
