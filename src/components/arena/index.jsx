import { useEffect, useLayoutEffect, useState } from "react";
import parse from "html-react-parser";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdb-react-ui-kit";
import "./index.css";
import ArenaHeader from "./header";
import ArenaSidePanel from "./side-panel";
import ArenaSidePanelMobile from "./side-panel-mobile";
import ArenaBalanceAmount from "./status/balance";
import ArenaDrawAmount from "./status/draw";
import ArenaRoundHeader from "./status/round";
import ArenaHeaderStatus from "./status/status";
import ArenaTotalBetHeader from "./status/total-bet";
import BettingHistory from "./components/BettingHistory";
import OtherBettingHistory from "./components/OtherBettingHistory";
import { socket } from "../../configs/socket";
import { handleDate } from "../../utility/utils";
import usePlayerArenaStore from "../../stores/playerArenaStore";
import useUserStore from "../../stores/userStore";
import useBetStore from "../../stores/betStore";
// import sgLogo from '../../assets/images/logo.png'
// import ArenaNotification from "./notification";

const Arena = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const getArena = usePlayerArenaStore(state => state.getArena);
  const getOwnedPoints = useUserStore(state => state.getCreditOwned);
  const getCurrentBet = usePlayerArenaStore(state => state.getCurrentBet);
  const getCurrentOutcome = usePlayerArenaStore(
    state => state.getCurrentOutcome
  );
  const finishRound = usePlayerArenaStore(state => state.finishRound);
  const reset = usePlayerArenaStore(state => state.resetSuccess);
  const frSuccess = usePlayerArenaStore(state => state.success.roundFinish);

  const updateNextRound = usePlayerArenaStore(state => state.updateNextRound);
  const updateSetRound = usePlayerArenaStore(state => state.updateSetRound);
  const setCurrentOutcome = usePlayerArenaStore(
    state => state.setCurrentOutcome
  );

  const arena = usePlayerArenaStore(state => state.arena);
  const arenaLoads = usePlayerArenaStore(state => state.loading.arena);
  const currentOutcome = usePlayerArenaStore(
    state => state.currentRoundOutcome
  );

  const getArenaBetsByUser = useBetStore(state => state.getArenaBetsByUser);
  const processBets = useBetStore(state => state.processUnprocessedBets);
  const pbSuccess = useBetStore(state => state.success.process);
  const pbReset = useBetStore(state => state.resetSuccess);

  const ccSuccess = useUserStore(state => state.success.cashoutCredit);

  useLayoutEffect(() => {
    getArena(state._id);
    getCurrentBet(state._id);
    getCurrentOutcome(state._id);
    processBets();
  }, []);

  useEffect(() => {
    if (pbSuccess) {
      getOwnedPoints();
      pbReset();
    }
  }, [pbSuccess]);

  useEffect(() => {
    socket.emit("joinArena", { arenaId: state._id, user: "player" });
    return () => {
      socket.emit("leaveArena", state._id);
    };
  }, []);

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    socket.on("connect_error", () => {
      setIsConnected(false);
    });
  }, []);

  useEffect(() => {
    socket.on("round:finish", data => {
      finishRound({
        arenaId: state._id,
        roundId: data._id,
      });
      getArenaBetsByUser(state._id);
      setCurrentOutcome(data.outcome);
    });
  }, []);

  useEffect(() => {
    if (arena?.status === "close") {
      window.location.href = "/player/arenaList";
    }
  }, [arena]);

  useEffect(() => {
    socket.on("round:next", data => updateNextRound(data));
  }, []);

  useEffect(() => {
    socket.on("round:set", data => updateSetRound(data));
  }, []);

  useEffect(() => {
    if (frSuccess) {
      getOwnedPoints();
      reset();
    }
  }, [frSuccess]);

  useEffect(() => {
    if (ccSuccess) {
      getOwnedPoints();
    }
  }, [ccSuccess]);

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
          <ArenaHeader />
          <MDBContainer fluid>
            <p style={{ color: "#fbf201" }} className="m-0 mt-3">
              Live Title( {state.eventName} ) - {handleDate(state.createdAt)}
            </p>
          </MDBContainer>
          <MDBContainer fluid className="px-0 main-bg">
            <Toaster reverseOrder={false} />

            <MDBRow className="mx-2 mt-1">
              <MDBCol xxl={8} xl={7} lg={6} className="px-1">
                <MDBContainer fluid className="p-3 arena-vid-wrapper">
                  <MDBContainer fluid className="px-3 arena-vid-container">
                    <div className="arena-dummy-vid">
                      {parse(state.arenaVideo.url)}
                    </div>
                  </MDBContainer>
                </MDBContainer>
              </MDBCol>

              <MDBCol xxl={4} xl={5} lg={6} className="px-1">
                {!isConnected && (
                  <MDBContainer
                    fluid
                    className="px-0 bg-warning mb-2 text-black fw-bold text-center rounded-3"
                  >
                    Please refresh your page
                  </MDBContainer>
                )}

                {currentOutcome !== "-" && (
                  <MDBContainer
                    fluid
                    className={`px-0 mb-2 text-black fw-bold text-center rounded-3 text-capitalize ${
                      currentOutcome === "meron"
                        ? "bg-success text-white"
                        : currentOutcome === "wala"
                        ? "bg-danger text-white"
                        : currentOutcome === "draw"
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                  >
                    {currentOutcome}
                  </MDBContainer>
                )}

                <MDBRow className="px-0">
                  <MDBCol>
                    <ArenaHeaderStatus status={arena?.bettingStatus} />
                  </MDBCol>
                  <MDBCol>
                    <ArenaRoundHeader item={arena?.fights} />
                  </MDBCol>
                </MDBRow>
                <ArenaSidePanel />
                <MDBRow className="mx-0 mt-3">
                  <BettingHistory />
                  <MDBContainer className="d-flex align-items-center justify-content-center flex-wrap mt-3">
                    <MDBRow>
                      <MDBCol size={3}>
                        <div className="mx-5 d-flex align-items-center flex-column">
                          <span
                            className={`my-2 square bg-danger rounded-circle text-center betting-history-icon`}
                          >
                            M
                          </span>
                          <h6 className="mt-2 text-white">MERON</h6>
                        </div>
                      </MDBCol>
                      <MDBCol size={3}>
                        <div className="mx-5 d-flex align-items-center flex-column">
                          <span
                            className={`my-2 square bg-primary rounded-circle text-center betting-history-icon`}
                          >
                            W
                          </span>
                          <h6 className="mt-2 text-white">WALA</h6>
                        </div>
                      </MDBCol>
                      <MDBCol size={3}>
                        <div className="mx-5 d-flex align-items-center flex-column">
                          <span
                            className={`my-2 square bg-success rounded-circle text-center betting-history-icon`}
                          >
                            D
                          </span>
                          <h6 className="mt-2 text-white">DRAW</h6>
                        </div>
                      </MDBCol>
                      <MDBCol size={3}>
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
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      )}
    </>
  );
};

export default Arena;
