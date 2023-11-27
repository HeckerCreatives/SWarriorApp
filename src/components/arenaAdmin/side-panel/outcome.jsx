// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";

// ** Redux
import { useSelector } from "react-redux";

const SidePanelOutcome = () => {
  // ** Redux States
  const storeGameHistory = useSelector((state) => state.gameHistory);

  return (
    <MDBCol>
      <MDBContainer
        fluid
        className="p-3 mt-4 sppayout-container position-relative"
      >
        <div className="sppayout-label px-3">CURRENT ROUND OUTCOME:</div>

        {storeGameHistory.isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <MDBContainer
            fluid
            role="button"
            className={`px-0 py-1 sppayout-btn sppayout-btn-${storeGameHistory.currentRoundOutcome?.outcome} mb-3`}
          >
            <MDBTypography
              tag="h4"
              className="text-center m-2"
              style={{ textTransform: "uppercase" }}
            >
              {storeGameHistory.currentRoundOutcome?.outcome || "---"}
            </MDBTypography>
          </MDBContainer>
        )}
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelOutcome;
