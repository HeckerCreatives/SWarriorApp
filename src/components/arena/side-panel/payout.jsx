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

// ** Redux
import { useSelector } from "react-redux";

// ** Components
import AnimatedNumber from "../components/AnimatedNumber";

const SidePanelPayout = () => {
  // ** Vars

  // ** Redux States
  const storeCurrentRoundBets = useSelector(state => state.currentRoundBets);
  const storeRoundStatus = useSelector(state => state.roundStatus);
  const [payoutOverallValues, setPayoutOverallValues] = useState("0");
  const currentBet = storeCurrentRoundBets.myCurrentBet;
  const [totaBet, setTotalBet] = useState(0);

  useEffect(() => {
    if (
      currentBet?.betAmount !== "" &&
      totaBet?.totalMeron !== "" &&
      totaBet?.totalWala !== ""
    ) {
      calculateRoundPayout(
        totaBet.totalMeron,
        totaBet.totalWala,
        storeRoundStatus.roundStatus.plasadaRate,
        currentBet.betAmount,
        currentBet.team
      );
    }
  }, [currentBet, totaBet]);

  const calculateRoundPayout = (
    meronOverall,
    walaOverall,
    plasada,
    playerCurrentBet,
    playerCurrentTeam
  ) => {
    const jsonData = {
      team: playerCurrentTeam,
      totalPayout: 0,
    };

    const overallBetSum = meronOverall + walaOverall;
    const totalWinnings =
      playerCurrentTeam === "meron"
        ? (overallBetSum / meronOverall) * playerCurrentBet
        : (overallBetSum / walaOverall) * playerCurrentBet;
    const tongAmount = totalWinnings * (plasada / 100);
    const FinalWinning = totalWinnings - tongAmount;
    jsonData.totalPayout = FinalWinning;
    setPayoutOverallValues(jsonData);
  };

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
              // role="button"
              className="px-0 py-1 sppayout-btn sppayout-btn-wala mb-3"
            >
              <MDBTypography tag="h4" className="text-center m-0">
                WALA
              </MDBTypography>

              <div
                className={`sppayout-bets sppayout-bets-wala text-center ${
                  currentBet?.team === "wala" ? "" : "sppayout-btn-inactive"
                }`}
              >
                <AnimatedNumber
                  value={
                    payoutOverallValues
                      ? payoutOverallValues?.team === "wala"
                        ? payoutOverallValues?.totalPayout
                        : 0
                      : 0
                  }
                />
              </div>
            </MDBContainer>
          </MDBCol>
          <MDBCol size={12} sm={6} md={12}>
            <MDBContainer
              fluid
              // role="button"
              className={`px-0 py-1 sppayout-btn sppayout-btn-meron ${
                currentBet?.team === "meron" ? "" : "sppayout-btn-inactive"
              }`}
            >
              <MDBTypography tag="h4" className="text-center m-0">
                MERON
              </MDBTypography>

              <div className="sppayout-bets sppayout-bets-meron text-center">
                <AnimatedNumber
                  value={
                    payoutOverallValues
                      ? payoutOverallValues?.team === "meron"
                        ? payoutOverallValues?.totalPayout
                        : 0
                      : 0
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
