import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { myCurrentBet } from "../../../redux/slices/currentRoundBets";

const ArenaDrawAmount = () => {
  const storeCurrentRoundBets = useSelector(state => state.currentRoundBets);
  const storeRoundStatus = useSelector(state => state.roundStatus);
  const currentBet = Number(storeCurrentRoundBets.myCurrentBet.betAmount);
  const currentPlasadaRate = Number(storeRoundStatus.roundStatus.plasadaRate);
  const tieRate = storeRoundStatus.roundStatus.tieRate;
  const [drawPayout, setDrawPayout] = useState(0);

  useEffect(() => {
    console.log("tieRate", tieRate);

    // console.log('drawPayout', currentBet)
    // console.log('drawPayoutComponentRoundStatus', storeRoundStatus)
    if (storeCurrentRoundBets.myCurrentBet.team === "draw") {
      const tongAmount = currentBet * (currentPlasadaRate / 100);
      // console.log('tongAmount', tongAmount)
      const totalPayout = currentBet - tongAmount;
      // console.log('totalDrawPayout', totalPayout)
      const totalPayoutMultpliedByTieRate = totalPayout * tieRate;
      // console.log('totalPayoutMultpliedByTieRate', totalPayoutMultpliedByTieRate)
      setDrawPayout(totalPayoutMultpliedByTieRate);
    }
  }, [drawPayout, storeCurrentRoundBets, storeRoundStatus]);

  console.log("useStatePayout", drawPayout);
  return (
    <MDBContainer fluid className="mx-5 ms-0 px-0">
      <MDBContainer fluid className="p-1 arena-status-header text-center">
        <span>DRAW PRICE</span>
      </MDBContainer>
      <MDBContainer fluid className="pt-1 pb-1 arena-status-body">
        <MDBTypography tag="h3" className="text-center m-0">
          {drawPayout.toFixed(2)}
          {/* {drawPayout} */}
        </MDBTypography>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ArenaDrawAmount;
