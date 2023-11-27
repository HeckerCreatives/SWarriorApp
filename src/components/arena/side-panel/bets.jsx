// ** React
import { useState, useEffect } from "react";

// ** Third Party Components
import toast from "react-hot-toast";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
  MDBIcon,
  MDBModalDialog,
  MDBModal,
  MDBModalContent,
} from "mdb-react-ui-kit";

// ** Components
import clear from "../../../assets/images/arena/clear.png";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  myCurrentBet,
  setCurrentRoundLoader,
} from "../../../redux/slices/currentRoundBets";

import { dataAdded } from "../../../redux/slices/socket";
import ArenaDrawAmount from "../status/draw";
import ArenaBalanceAmount from "../status/balance";

const SidePanelBets = () => {
  // Bet Meron Modal
  const [centredModalBetMeron, setCentredModalBetMeron] = useState(false);
  const toggleShowBetMeron = () => {
    setCentredModalBetMeron(!centredModalBetMeron);
  };

  // Bet Wala Modal
  const [centredModalBetWala, setCentredModalBetWala] = useState(false);
  const toggleShowBetWala = () => {
    setCentredModalBetWala(!centredModalBetWala);
  };

  // Bet Draw Modal
  const [centredModalBetDraw, setCentredModalBetDraw] = useState(false);
  const toggleShowBetDraw = () => {
    setCentredModalBetDraw(!centredModalBetDraw);
  };

  // ** Vars
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const arena_id = urlParams.get("arena_id");

  // ** Login User
  const auth = "";

  // ** States
  const [betAmount, setBetAmount] = useState("");
  const [betValues, setBetValues] = useState("");
  const [payoutValues, setPayoutValues] = useState("");
  const [allbuttonDisabler, setAllButtonDisabler] = useState(false);
  const [enabledDraw, setEnabledDraw] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);

  // ** Redux States
  const storeUsers = useSelector(state => state.users);
  const storeRoundStatus = useSelector(state => state.roundStatus);
  const storeCurrentRoundBets = useSelector(state => state.currentRoundBets);
  const currentBet = storeCurrentRoundBets.myCurrentBet;

  //**  testing logs
  // console.log(storeRoundStatus)

  // ** useEffect

  useEffect(() => {
    if (storeRoundStatus?.roundStatus?.isEnabledDraw) {
      setEnabledDraw(false);
    } else {
      setEnabledDraw(true);
    }
  }, [storeRoundStatus]);

  useEffect(() => {
    if (storeRoundStatus.roundStatus.status === "standby") {
      setBetAmount("");
    } else if (storeRoundStatus.roundStatus.status === "open") {
      setAllButtonDisabler(false);
    }
  }, [storeRoundStatus.roundStatus.status]);

  useEffect(() => {
    if (currentBet?.betAmount !== "") {
      if (currentBet.betAmount > 0) {
        setBetAmount(currentBet.betAmount);
        setAllButtonDisabler(true);
      }
    }
  }, [currentBet]);

  // ** Handles
  const handleBetSelection = value => {
    // setAllButtonDisabler(true)
    console.log("testForValue", value);

    if (value === "max") {
      setBetAmount(storeUsers.me?.points);
    } else if (value === "clear") {
      setBetAmount("");
    } else {
      setBetAmount(value);
    }
  };

  const handleInputChange = event => {
    setBetAmount(event.target.value);
  };

  const handleBetting = team => {
    setButtonLoader(true);
    setAllButtonDisabler(true);
    if (team === "meron") {
      setCentredModalBetMeron(!centredModalBetMeron);
    } else if (team === "wala") {
      setCentredModalBetWala(!centredModalBetWala);
    } else {
      setCentredModalBetDraw(!centredModalBetDraw);
    }

    if (betAmount && betAmount !== 0 && betAmount !== "" && betAmount !== "0") {
      const data = {
        arena_id,
        user_id: auth.user.id,
        team,
        amount: betAmount,
        round: storeRoundStatus.roundStatus.round,
        ghostMode: auth.user.GhostMode,
      };
      setBetValues(data.arena_id);
      setPayoutValues(data);

      if (auth.user.GhostMode === true) {
      }
    } else {
      toast.error("Please enter your betting amount");
      setAllButtonDisabler(false);
    }
  };

  const updateOverallBets = () => {
    if (typeof betValues === "string" && betValues !== "") {
    }
  };

  return (
    <MDBCol>
      <MDBContainer
        fluid
        className="pt-5 pb-5 px-3 mt-2 mb-1 sppayout-container position-relative"
      >
        <div className="form-group position-relative mb-2">
          <img
            src={clear}
            alt="clear"
            className="img-fluid spbets-btn-clear"
            role="button"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || (storeRoundStatus.roundStatus.status && true)
            }
            onClick={() => handleBetSelection("clear")}
            hidden={allbuttonDisabler === true}
          />

          {/* <MDBBtn
           color="dark"
          // onClick={toggleShow}
          className="coreq-modal-close-btn shadow-0"
        >
          <MDBIcon fas icon="times" size="2x"/>
        </MDBBtn> */}
          <input
            type="number"
            min="0"
            className="form-control spbets-input-text"
            value={betAmount}
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onChange={handleInputChange}
          />
        </div>
        <MDBContainer
          fluid
          className="px-0 d-flex align-items-center justify-content-between flex-wrap py-2"
          disabled={
            storeRoundStatus.roundStatus.status === "close" ||
            storeRoundStatus.roundStatus.status === "standby" ||
            allbuttonDisabler === true
              ? true
              : false || storeRoundStatus.roundStatus.status === "done round"
          }
        >
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection("50")}
          >
            50
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection("500")}
          >
            500
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection("1000")}
          >
            1k
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection("2000")}
          >
            2k
          </MDBBtn>

          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection("5000")}
          >
            5k
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection("max")}
          >
            MAX
          </MDBBtn>
        </MDBContainer>
        <MDBContainer
          fluid
          className="px-0 d-flex align-items-center justify-content-around pt-4 pb-3"
        >
          {/* {buttonLoader ? (
            <div className="d-flex justify-content-center">
              <MDBSpinner role="status" color="light" grow>
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            </div>
          ) :   (     */}
          <button
            className="spbets-btn-container p-2"
            role="button"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={toggleShowBetMeron}
            // onClick={() => handleBetting("meron")}
          >
            <div className="spbets-btn-meron">
              <MDBTypography tag="h4" className="m-0">
                MERON
              </MDBTypography>
            </div>
          </button>
          {/* )} */}

          {/* {buttonLoader  ? (
            <div className="d-flex justify-content-center">
              <MDBSpinner role="status" color="light" grow>
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            </div>
          ) : ( */}
          <button
            className="spbets-btn-container p-2"
            role="button"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={toggleShowBetWala}
            // onClick={() => handleBetting("wala")}
          >
            <div className="spbets-btn-wala">
              <MDBTypography tag="h4" className="m-0">
                WALA
              </MDBTypography>
            </div>
          </button>
          {/* )} */}
        </MDBContainer>

        <MDBContainer></MDBContainer>

        <MDBContainer className="text-center p-0 d-flex justify-content-around ">
          {/* {buttonLoader ? (
            <div className="d-flex justify-content-center">
              <MDBSpinner role="status" color="light" grow>
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            </div>
          ) : (   */}
          <button
            className="spbets-btn-container"
            role="button"
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={toggleShowBetDraw}
            hidden={enabledDraw}
          >
            <div className="spbets-btn-draw">
              <MDBTypography tag="h4" className="m-0">
                DRAW
              </MDBTypography>
            </div>
          </button>
          {/* )} */}

          <div
            className="p-2"
            style={{
              borderRadius: "10px",
              border: "3px solid silver",
              background: "#4d617e",
            }}
          >
            <div className=" mx-0 ps-0 ">
              <ArenaDrawAmount />
            </div>
          </div>
        </MDBContainer>

        {/* meron cofirmation modal */}
        <MDBModal
          tabIndex="-1"
          show={centredModalBetMeron}
          setShow={setCentredModalBetMeron}
        >
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>
                  {" "}
                  <MDBIcon fas icon="cogs" className="pe-3" /> Are you sure you
                  want to bet on MERON?
                </MDBModalTitle>
                <MDBBtn
                  type="button"
                  className="btn-close"
                  color="none"
                  onClick={toggleShowBetMeron}
                ></MDBBtn>
              </MDBModalHeader>

              <MDBModalFooter className="justify-content-center text-center pe-5">
                <MDBBtn
                  className="pe-5 ps-5 me-4"
                  onClick={() => handleBetting("meron")}
                >
                  Yes
                </MDBBtn>
                <MDBBtn className="pe-5 ps-5 ms-4" onClick={toggleShowBetMeron}>
                  No
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        {/* ------------------------------------------------------------------------------------- */}

        {/* wala cofirmation modal */}
        <MDBModal
          tabIndex="-1"
          show={centredModalBetWala}
          setShow={setCentredModalBetWala}
        >
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>
                  {" "}
                  <MDBIcon fas icon="cogs" className="pe-3" /> Are you sure you
                  want to bet on WALA?{" "}
                </MDBModalTitle>
                <MDBBtn
                  type="button"
                  className="btn-close"
                  color="none"
                  onClick={toggleShowBetWala}
                ></MDBBtn>
              </MDBModalHeader>

              <MDBModalFooter className="justify-content-center text-center pe-5">
                <MDBBtn
                  className="pe-5 ps-5 me-4"
                  onClick={() => handleBetting("wala")}
                >
                  Yes
                </MDBBtn>
                <MDBBtn className="pe-5 ps-5 ms-4" onClick={toggleShowBetWala}>
                  No
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        {/* ------------------------------------------------------------------------------------- */}

        {/* draw cofirmation modal */}
        <MDBModal
          tabIndex="-1"
          show={centredModalBetDraw}
          setShow={setCentredModalBetDraw}
        >
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>
                  {" "}
                  <MDBIcon fas icon="cogs" className="pe-3" /> Are you sure you
                  want to bet on DRAW?{" "}
                </MDBModalTitle>
                <MDBBtn
                  type="button"
                  className="btn-close"
                  color="none"
                  onClick={toggleShowBetDraw}
                ></MDBBtn>
              </MDBModalHeader>

              <MDBModalFooter className="justify-content-center text-center pe-5">
                <MDBBtn
                  className="pe-5 ps-5 me-4"
                  onClick={() => handleBetting("draw")}
                >
                  Yes
                </MDBBtn>
                <MDBBtn className="pe-5 ps-5 ms-4" onClick={toggleShowBetDraw}>
                  No
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        {/* ------------------------------------------------------------------------------------- */}
      </MDBContainer>

      <MDBContainer
        className="p-3 mt-3"
        style={{
          background: "black",
          border: "3px solid silver",
          borderRadius: "10px",
        }}
      >
        <ArenaBalanceAmount amount={storeUsers.me?.points} />
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelBets;
