// ** React
import { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
  MDBRow,
} from "mdb-react-ui-kit";

// ** Components
import clear from "../../../assets/images/arena/clear.png";
import ArenaDrawAmount from "../status/draw";
import ArenaBalanceAmount from "../status/balance";
import usePlayerArenaStore from "../../../stores/playerArenaStore";
import useUserStore from "../../../stores/userStore";
import Swal from "sweetalert2";
import { errToast } from "../../../utility/toaster";
import { useLocation } from "react-router-dom";
import AnimatedNumber from "../components/AnimatedNumber";
import { setPayout } from "../../../utility/plasada";
import { socket } from "../../../configs/socket";

const SidePanelBets = () => {
  const { state } = useLocation();

  const arena = usePlayerArenaStore(state => state.arena);
  const currentBet = usePlayerArenaStore(state => state.currentBet);
  const totalMeron = usePlayerArenaStore(state => state.totalBets.meron);
  const totalWala = usePlayerArenaStore(state => state.totalBets.wala);

  const getCreditOwned = useUserStore(state => state.getCreditOwned);
  const points = useUserStore(state => state.points);

  const betOnMeron = usePlayerArenaStore(state => state.betOnMeron);
  const betOnWala = usePlayerArenaStore(state => state.betOnWala);
  const betOnDraw = usePlayerArenaStore(state => state.betOnDraw);
  const reset = usePlayerArenaStore(state => state.resetSuccess);

  const loading = usePlayerArenaStore(state => state.loading.bet);
  const success = usePlayerArenaStore(state => state.success.bet);

  const update = usePlayerArenaStore(state => state.updateTotalBets);

  useEffect(() => {
    socket.on("updated:total-bets", data => {
      update(data);
    });
  }, []);

  useEffect(() => {
    socket.emit("get:total-bets", state._id);
  }, []);

  useEffect(() => {
    if (success) {
      getCreditOwned();
      setBetAmount("");
      reset();
    }
  }, [success]);

  const [betAmount, setBetAmount] = useState("");
  const statuses = ["close", "standby"];

  const isBetValid = () => {
    if (arena.bettingStatus !== "open") {
      errToast("Betting has not yet started.");
      return false;
    }

    if (isNaN(betAmount)) {
      errToast("Invalid bet");
      return false;
    }

    if (betAmount < 1) {
      errToast("Bet amount must not be 0");
      return false;
    }

    return true;
  };

  const handleWalaBet = () => {
    Swal.fire({
      title: "Are you sure you want to bet on WALA?",
      text: "( After confirmation you cannot change your bet. )",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        if (isBetValid()) {
          const betData = {
            arenaId: arena._id,
            amount: betAmount,
          };
          betOnWala(betData);
        }
      }
    });
  };

  const handleMeronBet = () => {
    Swal.fire({
      title: "Are you sure you want to bet on MERON?",
      text: "( After confirmation you cannot change your bet. )",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        if (isBetValid()) {
          const betData = {
            arenaId: arena._id,
            amount: betAmount,
          };
          betOnMeron(betData);
        }
      }
    });
  };

  const handleDrawBet = () => {
    Swal.fire({
      title: "Are you sure you want to bet on DRAW?",
      text: "( After confirmation you cannot change your bet. )",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        if (isBetValid()) {
          if (betAmount > 1000) {
            errToast("Max bet on DRAW is 1000");
            return;
          }

          const betData = {
            arenaId: arena._id,
            amount: betAmount,
          };
          betOnDraw(betData);
        }
      }
    });
  };

  return (
    <MDBCol className="">
      <MDBContainer fluid className="px-0 sppayout-container">
        <MDBContainer
          fluid
          className="px-0 d-flex align-items-center justify-content-around pt-4 pb-3"
        >
          <MDBRow className="px-0 w-100">
            <MDBCol className="mb-2">
              <MDBContainer
                fluid
                className="text-white bg-danger text-center rounded-top fs-6 fw-bolder"
              >
                MERON
              </MDBContainer>
              <MDBContainer
                fluid
                className="px-0 border-start border-end border-bottom"
              >
                <MDBContainer fluid className="text-center text-warning fs-5">
                  <AnimatedNumber value={Number(totalMeron) || 0} />
                </MDBContainer>
                <MDBContainer
                  fluid
                  className="text-center text-white d-flex align-items-center justify-content-center"
                  style={{ fontSize: "0.8rem" }}
                >
                  <span>PAYOUT =&nbsp;</span>
                  {
                    <AnimatedNumber
                      value={
                        setPayout(
                          state.plasadaRate,
                          totalMeron,
                          totalWala,
                          currentBet?.bet !== "draw" ? currentBet?.amount : 0
                        ).walaPayout || 0
                      }
                    />
                  }
                </MDBContainer>
                <MDBContainer
                  fluid
                  className="text-center text-success"
                  style={{ fontSize: "0.8rem" }}
                >
                  <AnimatedNumber
                    value={currentBet?.bet === "meron" ? currentBet?.amount : 0}
                  />
                </MDBContainer>
                <MDBContainer fluid className="my-2 text-center">
                  <button
                    onClick={handleMeronBet}
                    disabled={
                      loading ||
                      statuses.includes(arena?.bettingStatus) ||
                      currentBet
                    }
                    className="spbets-btn-container px-2 py-1"
                    role="button"
                  >
                    <div className="spbets-btn-meron">
                      <MDBTypography tag="h6" className="m-0 my-1">
                        {loading ? <MDBSpinner size="sm" /> : '"BET MERON"'}
                      </MDBTypography>
                    </div>
                  </button>
                </MDBContainer>
              </MDBContainer>
            </MDBCol>
            <MDBCol className="mb-2">
              <MDBContainer
                fluid
                className="text-white text-center rounded-top fs-6 fw-bolder"
                style={{
                  backgroundColor: "#3f51db",
                }}
              >
                WALA
              </MDBContainer>
              <MDBContainer
                fluid
                className="px-0 border-start border-end border-bottom"
              >
                <MDBContainer
                  fluid
                  className="text-center text-warning fw-bold fs-5"
                >
                  <AnimatedNumber value={Number(totalWala) || 0} />
                </MDBContainer>
                <MDBContainer
                  fluid
                  className="text-center text-white d-flex align-items-center justify-content-center"
                  style={{ fontSize: "0.8rem" }}
                >
                  <span>PAYOUT =&nbsp;</span>
                  {
                    <AnimatedNumber
                      value={
                        setPayout(
                          state.plasadaRate,
                          totalMeron,
                          totalWala,
                          currentBet?.bet !== "draw" ? currentBet?.amount : 0
                        ).walaPayout || 0
                      }
                    />
                  }
                </MDBContainer>
                <MDBContainer
                  fluid
                  className="text-center text-success"
                  style={{ fontSize: "0.8rem" }}
                >
                  <AnimatedNumber
                    value={currentBet?.bet === "wala" ? currentBet?.amount : 0}
                  />
                </MDBContainer>
                <MDBContainer fluid className="my-2 text-center">
                  <button
                    onClick={handleWalaBet}
                    disabled={
                      loading ||
                      statuses.includes(arena?.bettingStatus) ||
                      currentBet
                    }
                    className="spbets-btn-container px-2 py-1"
                    role="button"
                  >
                    <div className="spbets-btn-wala">
                      <MDBTypography tag="h6" className="m-0 my-1">
                        {loading ? <MDBSpinner size="sm" /> : '"BETWALA"'}
                      </MDBTypography>
                    </div>
                  </button>
                </MDBContainer>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
      <ArenaBalanceAmount />
      <MDBContainer
        fluid
        className="pt-4 pb-3 px-3 mt-2 mb-1 sppayout-container position-relative"
      >
        <div className="form-group position-relative mb-2">
          <img
            src={clear}
            onClick={() => setBetAmount("")}
            disabled={
              loading || statuses.includes(arena?.bettingStatus) || currentBet
            }
            alt="clear"
            className="img-fluid spbets-btn-clear"
            role="button"
          />

          <input
            placeholder="ENTER BET AMOUNT"
            type="number"
            min="0"
            disabled={
              loading || statuses.includes(arena?.bettingStatus) || currentBet
            }
            className="form-control spbets-input-text"
            onChange={e => setBetAmount(e.target.value)}
            value={betAmount}
          />
        </div>
        <MDBContainer
          fluid
          className="px-0 d-flex align-items-center justify-content-start gap-1 flex-wrap py-2"
        >
          <MDBBtn
            onClick={() => setBetAmount(50)}
            disabled={
              loading || statuses.includes(arena?.bettingStatus) || currentBet
            }
            className="spbets-btn-bet mb-2"
          >
            50
          </MDBBtn>
          <MDBBtn
            onClick={() => setBetAmount(500)}
            disabled={
              loading || statuses.includes(arena?.bettingStatus) || currentBet
            }
            className="spbets-btn-bet mb-2"
          >
            500
          </MDBBtn>
          <MDBBtn
            onClick={() => setBetAmount(1000)}
            disabled={
              loading || statuses.includes(arena?.bettingStatus) || currentBet
            }
            className="spbets-btn-bet mb-2"
          >
            1k
          </MDBBtn>
          <MDBBtn
            onClick={() => setBetAmount(2000)}
            disabled={
              loading || statuses.includes(arena?.bettingStatus) || currentBet
            }
            className="spbets-btn-bet mb-2"
          >
            2k
          </MDBBtn>
          <MDBBtn
            onClick={() => setBetAmount(5000)}
            disabled={
              loading || statuses.includes(arena?.bettingStatus) || currentBet
            }
            className="spbets-btn-bet mb-2"
          >
            5k
          </MDBBtn>
          <MDBBtn
            onClick={() => setBetAmount(points)}
            disabled={
              loading || statuses.includes(arena?.bettingStatus) || currentBet
            }
            className="spbets-btn-bet mb-2"
          >
            MAX
          </MDBBtn>
        </MDBContainer>

        {arena?.drawEnabled && (
          <MDBContainer
            fluid
            className="text-center p-0 mt-2 position-relative"
          >
            <button
              onClick={handleDrawBet}
              disabled={
                loading || statuses.includes(arena?.bettingStatus) || currentBet
              }
              className="spbets-btn-container py-2"
              role="button"
              style={{ position: "absolute", left: 1, top: -6 }}
            >
              <div className="spbets-btn-draw">
                <MDBTypography tag="h6" className="m-0 py-1">
                  BET DRAW
                </MDBTypography>
              </div>
            </button>
            <div className="mx-0 ps-0 ">
              <ArenaDrawAmount
                amount={currentBet?.bet === "draw" ? currentBet?.amount : 0}
              />
            </div>
            <div
              className="mt-2 text-start text-white"
              style={{ fontSize: "0.7rem" }}
            >
              DRAW WINS x8 Max. DRAW bet per player: 1000/fight
            </div>
          </MDBContainer>
        )}
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelBets;
