// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";

// ** Components
// import ArenaBettingTime from "./timer";
import SidePanelPayout from "./payout";
import SidePanelBets from "./bets";
import PreviousOutcomePanel from "./previousOutcome";
import SidePanelBetsMobile from "../side-panel-mobile/bets";

const ArenaSidePanel = () => {
  return (
    <MDBCol className="arena-panel-wrapper">
      <MDBContainer fluid className="py-4 px-3 arena-panel-container">
        {/* <ArenaBettingTime /> */}
        {/* <PreviousOutcomePanel /> */}
        {/* <SidePanelPayout /> */}
        <SidePanelBets />
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaSidePanel;
