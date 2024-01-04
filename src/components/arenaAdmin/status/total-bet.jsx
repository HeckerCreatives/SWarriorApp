// ** React
import React, { useEffect, useState } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdb-react-ui-kit";

// ** Components
import AnimatedNumber from "../components/AnimatedNumber";
import useAdminArenaStore from "../../../stores/adminArenaStore";
import { socket } from "../../../configs/socket";
import { useLocation } from "react-router-dom";

const ArenaTotalBetHeader = () => {
  const { state } = useLocation();
  const totalMeron = useAdminArenaStore(state => state.totalBets.meron);
  const totalWala = useAdminArenaStore(state => state.totalBets.wala);
  const update = useAdminArenaStore(state => state.updateTotalBets);

  useEffect(() => {
    socket.on("updated:total-bets", data => {
      update(data);
    });
  }, []);

  useEffect(() => {
    socket.emit("get:total-bets", state._id);
  }, []);

  return (
    <MDBCol>
      <MDBContainer fluid className="px-0 mb-2">
        <MDBContainer fluid className="p-1 arena-status-header text-center">
          <span>TOTAL BET</span>
        </MDBContainer>
        <MDBContainer
          fluid
          className="px-lg-0 px-xl-2 px-xxl-4 pt-2 pb-2 arena-status-body"
        >
          <MDBRow className="mx-0">
            <MDBCol size={6} className="px-1 px-xxl-3">
              <MDBContainer
                fluid
                className="arena-bet arena-bet-meron d-flex px-2 py-1"
              >
                <div className="me-2">MERON</div>
                <div className="arena-bet-value-meron flex-grow-1">
                  <AnimatedNumber value={Number(totalMeron).toFixed(2)} />
                </div>
              </MDBContainer>
            </MDBCol>
            <MDBCol size={6} className="px-1 px-xxl-3">
              <MDBContainer
                fluid
                className="arena-bet arena-bet-wala d-flex  px-2 py-1"
              >
                <div className="me-2">WALA</div>
                <div className="arena-bet-value-wala flex-grow-1">
                  <AnimatedNumber value={Number(totalWala).toFixed(2)} />
                </div>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaTotalBetHeader;
