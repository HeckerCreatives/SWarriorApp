// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import toast from "react-hot-toast";
import {
  MDBModalContent,
  MDBModalBody,
  MDBBtn,
  MDBModalDialog,
  MDBModal,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

// ** Utils
import { sumArray } from "../../../utility/utils";
import { dataAdded } from "../../../redux/slices/socket";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  myCurrentBet,
  setCurrentRoundLoader,
  setBetAmount,
} from "../../../redux/slices/currentRoundBets";

// ** Components
import AnimatedNumber from "../components/AnimatedNumber";

const SidePanelPayoutMobile = ({ data }) => {
  // Bet Meron Modal
  //  const [centredModalBetMeron , setCentredModalBetMeron ] = useState(false);
  //  const toggleShowBetMeron = () => {
  //      setCentredModalBetMeron (!centredModalBetMeron )
  // }

  //   // Bet Wala Modal
  //   const [centredModalBetWala , setCentredModalBetWala ] = useState(false);
  //   const toggleShowBetWala = () => {
  //       setCentredModalBetWala (!centredModalBetWala )
  //  }

  // ** Vars
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const arena_id = urlParams.get("arena_id");

  // ** Login User
  const auth = "";

  // ** React States
  const [centredModal, setCentredModal] = useState(false);
  const [teamChoosen, setTeamChoosen] = useState(false);
  const [currentBetState, setCurrentBetState] = useState(0);
  const [allbetData, setallBetData] = useState(0);
  const [fakeBetMeron, setFakeBetMeron] = useState(0);
  const [fakeBetWala, setFakeBetWala] = useState(0);
  const [totalBetLoader, setTotalBetLoader] = useState(true);
  // const [betAmount, setBetAmount] = useState("");
  const [allbuttonDisabler, setAllButtonDisabler] = useState(false);

  // // ** Vars

  // // ** Redux States

  const [payoutOverallValues, setPayoutOverallValues] = useState(0);
  const [totaBet, setTotalBet] = useState(0);
  const [betValues, setBetValues] = useState(0);

  // ** Redux States
  const storeUsers = useSelector(state => state.users);
  const storeCurrentRoundBets = useSelector(state => state.currentRoundBets);
  const storeRoundStatus = useSelector(state => state.roundStatus);

  const currentBet = storeCurrentRoundBets.myCurrentBet;
  const currentBetAmount = Number(currentBet.betAmount);
  console.log("currentBetis", currentBet.betAmount);
  // ** useEffects
  useEffect(() => {
    dispatch(myCurrentBet({ arena_id, user_id: auth.user.id }));
    // setTotalBetLoader(false)
  }, []);

  useEffect(() => {
    // if( storeRoundStatus.roundStatus.status === 'standby' ){
    //   setBetAmount("");
    // }else if(storeRoundStatus.roundStatus.status === 'open'){
    //   setAllButtonDisabler(false)
    // }
    if (storeRoundStatus.roundStatus.status === "open") {
      setAllButtonDisabler(false);
    }
  }, [storeRoundStatus.roundStatus.status]);

  useEffect(() => {
    if (currentBet?.betAmount !== "") {
      if (currentBet.betAmount > 0) {
        // setBetAmount(currentBet.betAmount)
        setAllButtonDisabler(true);
      }
    }
  }, [currentBet]);

  const toggleShow = team => {
    if (storeCurrentRoundBets.betAmount && team) {
      setTeamChoosen(team);
      setCentredModal(!centredModal);
    } else {
      toast.error("Please enter your betting amount");
    }
  };

  const handleBetting = team => {
    // setTotalBetLoader(true)
    setAllButtonDisabler(true);

    if (currentBet && currentBet !== 0 && currentBet !== "") {
      if (storeUsers.me?.points > storeCurrentRoundBets.betAmount) {
        const data = {
          arena_id,
          user_id: auth.user.id,
          team,
          amount: storeCurrentRoundBets.betAmount,
          round: storeRoundStatus.roundStatus.round,
          ghostMode: auth.user.GhostMode,
        };
        setBetValues(data.arena_id);
      } else {
        toast.error("Insufficient balance");
        // setTotalBetLoader(false)
      }
    } else {
      toast.error("Please enter your betting amount");
      // setTotalBetLoader(false)
      setAllButtonDisabler(false);
    }
  };

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
      {/* Confimation Modal */}
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="sm">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBModalBody>
              <p className="text-white text-center mb-4">
                Are you sure to place your bet on {teamChoosen}?
              </p>
              <div className="d-flex justify-content-center">
                <MDBBtn
                  color="secondary"
                  className="mx-3"
                  size="sm"
                  onClick={() => setCentredModal(false)}
                >
                  Cancel
                </MDBBtn>
                <MDBBtn
                  size="sm"
                  color={teamChoosen === "meron" ? "danger" : "primary"}
                  onClick={() => handleBetting(teamChoosen)}
                >
                  Place Bet {teamChoosen}
                </MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBContainer fluid className="p-3 sppayout-container position-relative">
        <MDBRow>
          <MDBCol size={6} sm={6} md={12} className="p-0 px-2">
            <MDBContainer fluid className="p-0">
              <MDBContainer
                fluid
                role="button"
                className={`px-0 py-1 sppayout-btn sppayout-btn-meron`}
              >
                <MDBTypography tag="h4" className="text-center m-0">
                  MERON
                </MDBTypography>
              </MDBContainer>
              <MDBContainer fluid className="p-0 sppayout-btn-content">
                <MDBRow className="d-flex align-items-center flex-column">
                  <MDBCol>
                    <h6
                      style={{ color: "#d6ff17", fontWeight: "bolder" }}
                      className="my-1 text-center"
                    >
                      {/* <AnimatedNumber
                        value={storeCurrentRoundBets.totalMeron}
                      /> */}

                      <AnimatedNumber
                        // value={allbetData ? (Number(allbetData.totalMeron)):(0)}
                        value={
                          allbetData
                            ? Number(allbetData.totalMeron + fakeBetMeron)
                            : 0
                        }
                      />
                    </h6>
                  </MDBCol>
                  <MDBCol>
                    <div className="sppayout-bets  text-center">
                      {/* {totalBetLoader ? ( 
                        <div className="d-flex justify-content-center">
                          <MDBSpinner
                            role="status"
                            size="sm"
                            color="light"
                            grow
                          >
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>
                        </div>
                      ) : (  */}
                      <span className="text-white fw-bolder">
                        PAYOUT:{" "}
                        {/* {currentBetState?.team === "meron"
                            ? (
                                Math.round(
                                  (currentBetState?.totalPayout || 0) * 100
                                ) / 100
                              ).toFixed(2)
                            : 0} */}
                        <AnimatedNumber
                          value={
                            payoutOverallValues
                              ? payoutOverallValues?.team === "meron"
                                ? payoutOverallValues?.totalPayout
                                : 0
                              : 0
                          }
                        />
                      </span>
                      {/* )} */}
                    </div>
                  </MDBCol>
                  {/* <MDBCol>
                    <p
                      style={{ color: "#72ff00", fontWeight: "bolder" }}
                      className="text-center m-0"
                    >
                      01
                    </p>
                  </MDBCol> */}
                  {/* <MDBCol>
                    <p
                      style={{ color: "#3f51db", fontWeight: "bolder" }}
                      className="text-center m-0"
                    >
                      {totalBetLoader ? (
                        <div className="d-flex justify-content-center">
                          <MDBSpinner
                            role="status"
                            size="sm"
                            color="light"
                            grow
                          >
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>
                        </div>
                      ) : currentBetState?.team === "meron" ? (
                        (Math.round(currentBetAmount * 100) / 100).toFixed(2)
                      ) : (
                        0
                      )}
                      
                    </p>
                  </MDBCol> */}
                  <MDBCol center className="text-center">
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
                      disabled={
                        // storeRoundStatus.roundStatus.status === "close" ? true : false
                        storeRoundStatus.roundStatus.status === "close" ||
                        storeRoundStatus.roundStatus.status === "standby" ||
                        allbuttonDisabler === true
                          ? true
                          : false ||
                            storeRoundStatus.roundStatus.status === "done round"
                      }
                      onClick={() => toggleShow("meron")}
                      // onClick={toggleShowBetMeron}
                    >
                      <div className="spbets-btn-meron">
                        <MDBTypography tag="h4" className="m-0">
                          "BET MERON"
                        </MDBTypography>
                      </div>
                    </button>
                    {/* ) } */}

                    {/* meron cofirmation modal */}
                    {/* <MDBModal tabIndex='-1' show={centredModalBetMeron} setShow={setCentredModalBetMeron}
              >
        <MDBModalDialog centered> 
          <MDBModalContent>
            <MDBModalHeader>
              
              <MDBModalTitle> <MDBIcon fas icon="cogs" className="pe-3"/> Are you sure you want to bet on MERON?</MDBModalTitle>
              <MDBBtn type="button" className='btn-close' color='none' onClick={toggleShowBetMeron}></MDBBtn>
            </MDBModalHeader>
            
            <MDBModalFooter className="justify-content-center text-center pe-5">
              <MDBBtn className='pe-5 ps-5 me-4' onClick={() => toggleShow("meron")}>
                Yes
              </MDBBtn>
              <MDBBtn className='pe-5 ps-5 ms-4' onClick={toggleShowBetMeron}>No</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> */}

                    {/* ------------------------------------------------------------------------------------- */}
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBContainer>
          </MDBCol>
          <MDBCol size={6} sm={6} md={12} className="p-0 px-2">
            <MDBContainer fluid className="p-0">
              <MDBContainer
                fluid
                role="button"
                className="px-0 py-1 sppayout-btn sppayout-btn-wala"
              >
                <MDBTypography tag="h4" className="text-center m-0">
                  WALA
                </MDBTypography>
              </MDBContainer>

              <MDBContainer fluid className="p-0 sppayout-btn-content">
                <MDBRow className="d-flex align-items-center flex-column">
                  <MDBCol className="p-0">
                    <h6
                      style={{ color: "#d6ff17", fontWeight: "bolder" }}
                      className="my-1 text-center"
                    >
                      {/* <AnimatedNumber value={storeCurrentRoundBets.totalWala} /> */}

                      <AnimatedNumber
                        // value={allbetData ? (Number(allbetData.totalWala)):(0)}
                        value={
                          allbetData
                            ? Number(allbetData.totalWala + fakeBetWala)
                            : 0
                        }
                      />
                    </h6>
                  </MDBCol>
                  <MDBCol>
                    <div className={`sppayout-bets text-center`}>
                      {/* {totalBetLoader ? (
                        <div className="d-flex justify-content-center">
                          <MDBSpinner
                            role="status"
                            size="sm"
                            color="light"
                            grow
                          >
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>
                        </div>
                      ) : ( */}
                      <span className="text-white fw-bolder">
                        PAYOUT:{" "}
                        {/* {currentBet?.team === "wala"
                            ? (
                                Math.round(
                                  (currentBet?.totalPayout || 0) * 100
                                ) / 100
                              ).toFixed(2)
                            : 0} */}
                        <AnimatedNumber
                          value={
                            payoutOverallValues
                              ? payoutOverallValues?.team === "wala"
                                ? payoutOverallValues?.totalPayout
                                : 0
                              : 0
                          }
                        />
                      </span>
                      {/* )} */}
                    </div>
                  </MDBCol>
                  {/* <MDBCol>
                    <p
                      style={{ color: "#72ff00", fontWeight: "bolder" }}
                      className="text-center m-0"
                    >
                      01
                    </p>
                  </MDBCol> */}
                  {/* <MDBCol>
                    <p
                      style={{ color: "#3f51db", fontWeight: "bolder" }}
                      className="text-center m-0"
                    >
                      {totalBetLoader ? (
                        <div className="d-flex justify-content-center">
                          <MDBSpinner
                            role="status"
                            size="sm"
                            color="light"
                            grow
                          >
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>
                        </div>
                      ) : currentBet?.team === "wala" ? (
                        (Math.round(currentBetAmount * 100) / 100).toFixed(2)
                      ) : (
                        0
                      )}
                      
                    </p>
                  </MDBCol> */}
                  <MDBCol center className="text-center">
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
                      disabled={
                        // storeRoundStatus.roundStatus.status === "close"
                        //   ? true
                        //   : false
                        storeRoundStatus.roundStatus.status === "close" ||
                        storeRoundStatus.roundStatus.status === "standby" ||
                        allbuttonDisabler === true
                          ? true
                          : false ||
                            storeRoundStatus.roundStatus.status === "done round"
                      }
                      onClick={() => toggleShow("wala")}
                      // onClick={toggleShowBetWala}
                    >
                      <div className="spbets-btn-wala">
                        <MDBTypography tag="h4" className="m-0">
                          "BET WALA"
                        </MDBTypography>
                      </div>
                    </button>
                    {/* )} */}

                    {/* wala cofirmation modal */}
                    {/* <MDBModal tabIndex='-1' show={centredModalBetWala} setShow={setCentredModalBetWala}
              >
        <MDBModalDialog centered> 
          <MDBModalContent>
            <MDBModalHeader>
              
              <MDBModalTitle> <MDBIcon fas icon="cogs" className="pe-3"/> Are you sure you want to bet on WALA? </MDBModalTitle>
              <MDBBtn type="button" className='btn-close' color='none' onClick={toggleShowBetWala}></MDBBtn>
            </MDBModalHeader>
            
            <MDBModalFooter className="justify-content-center text-center pe-5">
              <MDBBtn className='pe-5 ps-5 me-4' onClick={() => toggleShow("wala")}>
                Yes
              </MDBBtn>
              <MDBBtn className='pe-5 ps-5 ms-4' onClick={toggleShowBetWala}>No</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> */}

                    {/* ------------------------------------------------------------------------------------- */}
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelPayoutMobile;
