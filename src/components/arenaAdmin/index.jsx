// ** React
import { useEffect, useLayoutEffect, useState } from "react";

// ** Third Party Components
import toast, { Toaster } from "react-hot-toast";
import parse from "html-react-parser";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Components
import ArenaHeader from "./header";
import ArenaSidePanel from "./side-panel";
// import ArenaBalanceAmount from "./status/balance";
// import ArenaDrawAmount from "./status/draw";
import ArenaRoundHeader from "./status/round";
import ArenaHeaderStatus from "./status/status";
import ArenaTotalBetHeader from "./status/total-bet";
import BettingHistory from "./components/BettingHistory";
import OtherBettingHistory from "./components/OtherBettingHistory";
import { handleDate } from "../../utility/utils";
import { socket } from "../../configs/socket";
import useAdminArenaStore from "../../stores/adminArenaStore";

const ArenaAdmin = () => {
  const { state } = useLocation();

  const getArena = useAdminArenaStore(state => state.getArena);
  const getCurrentOutcome = useAdminArenaStore(
    state => state.getCurrentOutcome
  );

  const arena = useAdminArenaStore(state => state.arena);
  const arenaLoads = useAdminArenaStore(state => state.loading.arena);

  useLayoutEffect(() => {
    socket.emit("get:total-bets", state._id);
  }, []);

  useLayoutEffect(() => {
    getArena(state._id);
    getCurrentOutcome(state._id);
  }, []);

  useEffect(() => {
    socket.emit("joinArena", { arenaId: state._id, user: "controller" });
    return () => {
      socket.emit("leaveArena", state._id);
    };
  }, []);

  useEffect(() => {
    socket.on("connect_error", () => {
      // connection error here
    });
  }, []);

  return (
    <>
      {arenaLoads ? (
        <MDBContainer
          fluid
          className="px-0 main-bg d-flex align-items-center justify-content-center"
        >
          <MDBSpinner color="white" style={{ width: "5rem", height: "5rem" }} />
        </MDBContainer>
      ) : (
        <MDBContainer fluid className="px-0 main-bg">
          <Toaster reverseOrder={false} />
          <ArenaHeader />

          <MDBContainer fluid>
            <p style={{ color: "#fbf201" }} className="m-0">
              Live Title ( {state.eventName} ) - ( {handleDate(state.createdAt)}{" "}
              )
            </p>
          </MDBContainer>

          <MDBRow className="mx-2 mt-3">
            <MDBCol xxl={9} xl={8} lg={7} className="px-1">
              <MDBRow className="px-0">
                <MDBCol xxl={3} xl={3} lg={3}>
                  <ArenaHeaderStatus status={arena?.bettingStatus} />
                </MDBCol>
                <MDBCol xxl={7} xl={7} lg={7} className="px-lg-0">
                  <ArenaTotalBetHeader />
                </MDBCol>
                <MDBCol xxl={2} xl={2} lg={2}>
                  <ArenaRoundHeader />
                </MDBCol>
              </MDBRow>
              <MDBContainer fluid className="p-3 arena-vid-wrapper">
                <MDBContainer fluid className="px-3 arena-vid-container">
                  <div className="arena-dummy-vid" onContextMenu={false}>
                    {parse(state.arenaVideo.url)}
                  </div>
                </MDBContainer>
              </MDBContainer>

              <MDBContainer id="arenaDisplayer" className=" mt-3">
                <div className="bg-warning text-center">
                  <p className="p-2">
                    <strong>Arena Message</strong>
                  </p>
                </div>
              </MDBContainer>
            </MDBCol>
            <MDBCol xxl={3} xl={4} lg={5} className="px-1">
              <ArenaSidePanel />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mx-0 mt-3">
            <BettingHistory />
            <MDBContainer className="d-flex align-items-center justify-content-center flex-wrap mt-5">
              <MDBRow>
                <MDBCol>
                  <div className="mx-5 d-flex align-items-center flex-column">
                    <span
                      className={`my-2 square bg-danger rounded-circle text-center betting-history-icon`}
                    >
                      M
                    </span>
                    <h6 className="mt-2 text-white">MERON</h6>
                  </div>
                </MDBCol>
                <MDBCol>
                  <div className="mx-5 d-flex align-items-center flex-column">
                    <span
                      className={`my-2 square bg-primary rounded-circle text-center betting-history-icon`}
                    >
                      W
                    </span>
                    <h6 className="mt-2 text-white">WALA</h6>
                  </div>
                </MDBCol>
                <MDBCol>
                  <div className="mx-5 d-flex align-items-center flex-column">
                    <span
                      className={`my-2 square bg-success rounded-circle text-center betting-history-icon`}
                    >
                      D
                    </span>
                    <h6 className="mt-2 text-white">DRAW</h6>
                  </div>
                </MDBCol>
                <MDBCol>
                  <div className="mx-5 d-flex align-items-center flex-column">
                    <span
                      className={`my-2 square bg-light text-dark rounded-circle text-center betting-history-icon`}
                    >
                      C
                    </span>
                    <h6 className="mt-2 text-white">CANCEL</h6>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <OtherBettingHistory />
          </MDBRow>
        </MDBContainer>
      )}
    </>
  );
};

export default ArenaAdmin;
