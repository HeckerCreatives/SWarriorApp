// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";

import AnimatedNumber from "../components/AnimatedNumber";
import usePlayerArenaStore from "../../../stores/playerArenaStore";
import { setPayout } from "../../../utility/plasada";
import { useLocation } from "react-router-dom";

const SidePanelPayout = () => {
  const { state } = useLocation();
  const currentBet = usePlayerArenaStore(state => state.currentBet);
  const totalMeron = usePlayerArenaStore(state => state.totalBets.meron);
  const totalWala = usePlayerArenaStore(state => state.totalBets.wala);

  return (
    <MDBCol>
      <MDBContainer
        fluid
        className="p-3 mt-4 sppayout-container position-relative"
      >
        <div className="sppayout-label px-3">PAYOUT</div>
        <MDBRow>
          <MDBCol size={12} sm={6} md={12}>
            <MDBContainer
              fluid
              className={`px-0 py-1 sppayout-btn sppayout-btn-wala mb-3 ${
                currentBet && currentBet?.bet === "wala"
                  ? ""
                  : "sppayout-btn-inactive"
              }`}
            >
              <MDBTypography tag="h4" className="text-center m-0">
                WALA
              </MDBTypography>

              <div className={`sppayout-bets sppayout-bets-wala text-center `}>
                <AnimatedNumber
                  value={
                    setPayout(
                      state.plasadaRate,
                      totalMeron,
                      totalWala,
                      currentBet?.amount || 0
                    ).walaPayout || 0
                  }
                />
              </div>
            </MDBContainer>
          </MDBCol>
          <MDBCol size={12} sm={6} md={12}>
            <MDBContainer
              fluid
              className={`px-0 py-1 sppayout-btn sppayout-btn-meron ${
                currentBet && currentBet?.bet === "meron"
                  ? ""
                  : "sppayout-btn-inactive"
              }`}
            >
              <MDBTypography tag="h4" className="text-center m-0">
                MERON
              </MDBTypography>

              <div className="sppayout-bets sppayout-bets-meron text-center">
                <AnimatedNumber
                  value={
                    setPayout(
                      state.plasadaRate,
                      totalMeron,
                      totalWala,
                      currentBet?.amount || 0
                    ).walaPayout || 0
                  }
                />
              </div>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelPayout;
