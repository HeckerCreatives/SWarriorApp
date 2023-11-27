// ** React
import { useState, useEffect } from "react";

// ** Third Party Components
import toast from "react-hot-toast";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBIcon,
  MDBModalFooter,
  MDBSpinner,
} from "mdb-react-ui-kit";

// ** Components
import clear from "../../../assets/images/arena/clear.png";
import ArenaDrawAmount from "../status/draw";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  myCurrentBet,
  setCurrentRoundLoader,
  setBetAmount,
} from "../../../redux/slices/currentRoundBets";

const SidePanelBetsMobile = () => {
  // ** Vars
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const arena_id = urlParams.get("arena_id");

  // ** Login User
  const auth = "";

  // ** States
  const [betAmounts, setBetAmounts] = useState("");
  const [allbuttonDisabler, setAllButtonDisabler] = useState(true);
  const [totalBetLoader, setTotalBetLoader] = useState(false);

  // ** Redux States
  const storeUsers = useSelector(state => state.users);
  const storeRoundStatus = useSelector(state => state.roundStatus);
  const storeCurrentRoundBets = useSelector(state => state.currentRoundBets);
  const [centredModalBetDraw, setCentredModalBetDraw] = useState(false);
  const [enabledDraw, setEnabledDraw] = useState(true);

  const currentBet = Number(storeCurrentRoundBets.myCurrentBet.betAmount);
  const currentPlasadaRate = Number(storeRoundStatus.roundStatus.plasadaRate);
  const tieRate = storeRoundStatus.roundStatus.tieRate;
  const [drawPayout, setDrawPayout] = useState(0);
  console.log("this is the round status", storeRoundStatus.roundStatus);
  const toggleShowBetDraw = () => {
    setCentredModalBetDraw(!centredModalBetDraw);
  };

  useEffect(() => {
    if (storeRoundStatus?.roundStatus?.isEnabledDraw) {
      setEnabledDraw(false);
    } else {
      setEnabledDraw(true);
    }
  }, [storeRoundStatus]);

  useEffect(() => {
    if (storeRoundStatus.roundStatus.status === "standby") {
      setBetAmounts(currentBet);
      dispatch(setBetAmount(0));
    } else if (storeRoundStatus.roundStatus.status === "open") {
      setBetAmounts(currentBet);
      setAllButtonDisabler(false);
    }
  }, [storeRoundStatus.roundStatus.status]);

  useEffect(() => {
    if (currentBet?.betAmount !== "") {
      console.log("mobileViewBetTEster", currentBet.betAmount);
      if (currentBet > 0) {
        setBetAmounts(currentBet);
        setAllButtonDisabler(true);
        // dispatch(setBetAmount(currentBet.betAmount));
      }
    }
  }, [currentBet]);

  // ** Handles
  const handleBetSelection = value => {
    console.log("this is from mobile view", value);
    if (value === "max") {
      dispatch(setBetAmount(storeUsers.me?.points));
      setBetAmounts(storeUsers.me?.points);
    } else if (value === "clear") {
      dispatch(setBetAmount(0));
      setBetAmounts(0);
    } else {
      dispatch(setBetAmount(value));
      setBetAmounts(value);
    }
  };

  // const handleBetSelection = (value) => {
  //   if (value === "max") {
  //     setBetAmount(storeUsers.me?.points);
  //   } else if (value === "clear") {
  //     setBetAmount("");
  //   } else {
  //     setBetAmount(value);
  //   }
  // };

  const handleInputChange = event => {
    console.log(
      "thius is the inpute change on mobile device",
      event.target.value
    );
    setBetAmounts(event.target.value);
    //  setBetAmounts(currentBet)
    dispatch(setBetAmount(parseInt(event.target.value)));
  };

  const handleBetting = async team => {
    setAllButtonDisabler(true);

    if (betAmounts && betAmounts !== 0) {
      const data = {
        arena_id,
        user_id: auth.user.id,
        team,
        amount: betAmounts,
        round: storeRoundStatus.roundStatus.round,
        ghostMode: auth.user.GhostMode,
      };

      setCentredModalBetDraw(!centredModalBetDraw);
    } else {
      setCentredModalBetDraw(!centredModalBetDraw);
      toast.error("Please enter your betting amount");
      setAllButtonDisabler(false);
    }
  };

  return (
    <MDBCol className="mx-0">
      {/* ------------------------- */}
      <MDBRow className="my-3">
        <MDBCol
          xxl={3}
          xl={3}
          lg={3}
          md={4}
          sm={5}
          size={6}
          className="text-center"
        >
          {/* {totalBetLoader ? 
                      ( <div className="d-flex justify-content-center">
                      <MDBSpinner role="status" color="light" grow>
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                     ) : (   */}
          <button
            className="spbets-btn-container p-2 my-2"
            role="button"
            onClick={toggleShowBetDraw}
            hidden={enabledDraw}
            disabled={
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
          >
            <div className="spbets-btn-draw">
              <MDBTypography tag="h4" className="m-0">
                BET DRAW
              </MDBTypography>
            </div>
          </button>

          {/* )} */}

          {/* ------------------------------------------------------------------------------------------- */}
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
                    <MDBIcon fas icon="cogs" className="pe-3" /> Are you sure
                    you want to bet on WALA?{" "}
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
                  <MDBBtn
                    className="pe-5 ps-5 ms-4"
                    onClick={toggleShowBetDraw}
                  >
                    No
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </MDBCol>
        <MDBCol
          xxl={3}
          xl={3}
          lg={3}
          md={4}
          sm={5}
          size={6}
          className="offset-xxl-6 offset-xl-6 offset-lg-6 offset-md-4 offset-sm-2"
        >
          <div
            className="p-2 me-3 ms-0"
            style={{
              borderRadius: "10px",
              border: "2px solid silver",
              background: "#2f3947",
            }}
          >
            <ArenaDrawAmount />
          </div>
        </MDBCol>
      </MDBRow>

      {/* ------------------ */}
      <MDBContainer fluid className="sppayout-container p-3 position-relative">
        <div className="form-group position-relative mb-2">
          <img
            src={clear}
            alt="clear"
            className="img-fluid spbets-btn-clear"
            role="button"
            disabled={
              // storeRoundStatus.roundStatus.status === "close" ? true : false || (storeRoundStatus.roundStatus.status && true)
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection("clear")}
            hidden={allbuttonDisabler === true}
          />
          <input
            type="number"
            min="0"
            className="form-control spbets-input-text"
            //  value={storeCurrentRoundBets.betAmount}
            value={betAmounts}
            disabled={
              // storeRoundStatus.roundStatus.status === "close" ? true : false
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
            // storeRoundStatus.roundStatus.status === "close" ? true : false
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
              // storeRoundStatus.roundStatus.status === "close" ? true : false
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection(50)}
          >
            50
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              // storeRoundStatus.roundStatus.status === "close" ? true : false
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection(500)}
          >
            500
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              // storeRoundStatus.roundStatus.status === "close" ? true : false
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection(1000)}
          >
            1k
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              // storeRoundStatus.roundStatus.status === "close" ? true : false
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection(2000)}
          >
            2k
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              // storeRoundStatus.roundStatus.status === "close" ? true : false
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby" ||
              allbuttonDisabler === true
                ? true
                : false || storeRoundStatus.roundStatus.status === "done round"
            }
            onClick={() => handleBetSelection(5000)}
          >
            5k
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            disabled={
              // storeRoundStatus.roundStatus.status === "close" ? true : false
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
        {/* <MDBContainer
          fluid
          className="px-0 d-flex align-items-center justify-content-around pt-4 pb-3"
        >
          {storeCurrentRoundBets.currentRoundLoader ? (
            <div className="d-flex justify-content-center">
              <MDBSpinner role="status" color="light" grow>
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            </div>
          ) : (
            <button
              className="spbets-btn-container p-2"
              role="button"
              disabled={
                storeRoundStatus.roundStatus.status === "close" ? true : false
              }
              onClick={() => handleBetting("meron")}
            >
              <div className="spbets-btn-meron">
                <MDBTypography tag="h4" className="m-0">
                  MERON
                </MDBTypography>
              </div>
            </button>
          )}

          {storeCurrentRoundBets.currentRoundLoader ? (
            <div className="d-flex justify-content-center">
              <MDBSpinner role="status" color="light" grow>
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            </div>
          ) : (
            <button
              className="spbets-btn-container p-2"
              role="button"
              disabled={
                storeRoundStatus.roundStatus.status === "close" ? true : false
              }
              onClick={() => handleBetting("wala")}
            >
              <div className="spbets-btn-wala">
                <MDBTypography tag="h4" className="m-0">
                  WALA
                </MDBTypography>
              </div>
            </button>
          )}
        </MDBContainer> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelBetsMobile;
