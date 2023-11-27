//  ** React
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// ** Third Party Components
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
  MDBModalBody,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
} from "mdb-react-ui-kit";

// ** Redux
import { useDispatch, useSelector } from "react-redux";

// ** Utils

import {
  setPayoutButtonLoader,
  setRoundLoader,
  setBettingLoader,
  setNextRoundLoader,
} from "../../../redux/slices/roundStatus";

const SidePanelBets = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const arena_id = urlParams.get("arena_id");
  const dispatch = useDispatch();
  const [allbetData, setallBetData] = useState("");

  // ** Redux States
  const storeRoundStatus = useSelector(state => state.roundStatus);
  const storeGameHistory = useSelector(state => state.gameHistory);
  console.log("this is the RoundStatus", storeRoundStatus);
  // ** React States
  const [centredModal, setCentredModal] = useState(false);
  const [currentRoomState, setCurrentRoomState] = useState("");

  // round number input
  const [roundDataInput, setRoundDataInput] = useState("");

  //  ** Button States
  const [drawEnabler, setDrawEnabler] = useState(true);
  const [openBettingStatus, setOpenBettingStatus] = useState(true);
  const [closeBettingStatus, setCloseBettingStatus] = useState(true);
  const [declareResultEnabler, setDeclareResultEnabler] = useState(true);
  const [resetAllEnabler, setResetAllEnabler] = useState(false);
  const [updateRoundEnabler, setUpdateRoundEnabler] = useState(true);
  const [nextRoundEnabler, setNextRoundEnabler] = useState(false);

  //  ** Button Actions
  const [popupModalActions, setPopupModalActions] = useState("");

  //  ** Button Colors and Words
  const [popupMessage, setPopupMessage] = useState("");
  const [popupButtonColors, setPopupButtonColors] = useState("");
  const [popupButtonMessage, setPopupButtonMessage] = useState("");
  console.log("popModulal", popupModalActions);
  console.log("currentRoomState", currentRoomState);
  //  ** Loaders
  useEffect(() => {
    setDrawEnabler(storeRoundStatus.roundStatus?.isEnabledDraw ? false : true);
    setOpenBettingStatus(
      storeRoundStatus.roundStatus?.status === "standby" ? false : true
    );
    setCloseBettingStatus(
      storeRoundStatus.roundStatus?.status === "close"
        ? true
        : storeRoundStatus.roundStatus?.status == "open"
        ? false
        : true
    );
    setDeclareResultEnabler(
      storeRoundStatus.roundStatus.status === "close"
        ? storeGameHistory.currentRoundOutcome !== null
          ? true
          : false
        : true
    );
    setUpdateRoundEnabler(
      storeRoundStatus.roundStatus?.status === "done round" ? false : true
    );
    setResetAllEnabler(
      storeRoundStatus.roundStatus?.status === "close"
        ? storeGameHistory.currentRoundOutcome !== null
          ? false
          : true
        : true
    );
  }, [storeRoundStatus, storeGameHistory]);

  // ** ADMIN CONTROLS FUNCTIONS
  const OpenArena = () => {
    setPopupMessage("Are you sure you want to open the current round?");
    setPopupButtonColors("");
    setPopupButtonMessage("Open Round");
    setCurrentRoomState("open");
    setCentredModal(!centredModal);
  };

  const CloseArena = () => {
    setPopupMessage("Are you sure you want to close the current round?");
    setPopupButtonColors("warning");
    setPopupButtonMessage("Close Round");
    setCurrentRoomState("close");
    setCentredModal(!centredModal);
  };

  const BettingArenaStatusAction = status => {
    dispatch(setBettingLoader(true));
    setCentredModal(!centredModal);
  };

  const DeclareResult = status => {
    setCentredModal(!centredModal);
    setPopupMessage(`Are you sure you want to choose ${status}? `);
    switch (status) {
      case "meron":
        setPopupButtonColors("danger");
        break;
      case "wala":
        setPopupButtonColors("");
        break;
      case "draw":
        setPopupButtonColors("success");
        break;
      case "cancel":
        setPopupButtonColors("light");
        break;
      default:
        console.log("nothing");
        break;
    }
    setPopupButtonMessage(`Proceed to ${status}`);
    setCurrentRoomState(status);
  };

  const DeclareResultAction = status => {
    console.log("declareResult action", status);

    if (currentRoomState !== "cancel") {
      console.log(
        "if StateMent test",
        allbetData === undefined ||
          allbetData === null ||
          Number(allbetData.totalMeron) <= 0 ||
          Number(allbetData.totalWala) <= 0
      );
      if (
        allbetData === undefined ||
        allbetData === null ||
        Number(allbetData.totalMeron) <= 0 ||
        Number(allbetData.totalWala) <= 0
      ) {
        toast.error(
          "You can only select cancel since the total bet is not balance"
        );
        setCentredModal(!centredModal);
        return;
      }

      //  if (Number(allbetData.totalMeron) <= 0 && Number(allbetData.totalWala) <=0){
      //   toast.error("You can only select cancel since the total bet is not balance");
      //   setCentredModal(!centredModal)
      //   return;
      // }
    }
    setDeclareResultEnabler(true);
    // dispatch(setRoundLoader(true));

    setCentredModal(!centredModal);
  };

  const ResetAll = payout => {
    // setResetAllEnabler(true)

    setPopupMessage("Are you sure you want to finish the round?");
    setPopupButtonColors("");
    setPopupButtonMessage("Finish Round");

    setCurrentRoomState("finishRound");
    setCentredModal(!centredModal);
  };

  const ResetAllAction = status => {
    // dispatch(setPayoutButtonLoader(true));
    setResetAllEnabler(true);
    setNextRoundEnabler(false);

    const payoutData = {
      arena_id: arena_id,
      round: storeRoundStatus.roundStatus.round,
      outcome: storeGameHistory.currentRoundOutcome.outcome,
      historyID: storeGameHistory.currentRoundOutcome.id,
      tieRate: storeRoundStatus.roundStatus.tieRate,
      plasada: storeRoundStatus.roundStatus.plasadaRate,
      adminID: process.env.REACT_APP_SGLIVE_ADMIN_ID,
    };

    setCentredModal(!centredModal);
  };

  const NextRound = () => {
    setPopupMessage("Are you sure you want to proceed to next round?");
    setPopupButtonColors("success");
    setPopupButtonMessage("Next Round");
    setCurrentRoomState("standby");
    setCentredModal(!centredModal);
    setNextRoundEnabler(true);
  };

  const NextRoundAction = status => {
    dispatch(setNextRoundLoader(true));
    setCentredModal(!centredModal);
  };

  //  const user = JSON.parse(localStorage.getItem('auth'))
  const reDeclare = () => {
    setPopupMessage("Are you sure you want to Re-Declare This Round?");
    setPopupButtonColors("");
    setPopupButtonMessage("redeclare round");
    setCurrentRoomState("redeclare");
    setCentredModal(!centredModal);
  };

  const ReDeclareAction = () => {
    dispatch(setPayoutButtonLoader(true));
    async function deleteOutcome(data_id) {
      try {
        const response = await fetch(
          process.env.REACT_APP_SGLIVE_API_URL + `game-histories/${data_id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${user.jwt}` },
          }
        );
        const data = await response.json();

        if (response.ok) {
          window.location.reload();
          console.log("Delete Successful:", data);
        }
      } catch (error) {
        console.log("Delete Error:", error);
      }
    }

    deleteOutcome(storeGameHistory.currentRoundOutcome.id);

    console.log(
      "this is the gameHistory ID to be used",
      storeGameHistory.currentRoundOutcome.id
    );

    setCentredModal(!centredModal);
  };

  //  update round number function

  const handleInputChange = event => {
    setRoundDataInput(parseInt(event.target.value));
  };

  const updateRoundNumber = () => {
    setPopupMessage("Are you sure you want to update the Round Number?");
    setPopupButtonColors("success");
    setPopupButtonMessage("update round");
    setCurrentRoomState("updateround");
    setCentredModal(!centredModal);
  };

  const updateRoundNumberAction = async () => {
    const toastId = toast.loading("updating Round Number Please Wait...");
    setCentredModal(!centredModal);
    if (roundDataInput > 0) {
      try {
        const response = await fetch(
          process.env.REACT_APP_SGLIVE_API_URL +
            `arenas/${storeRoundStatus.roundStatus.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.jwt}`,
            },
            body: JSON.stringify({ round: roundDataInput }),
          }
        );

        const json = await response.json();
        if (response.ok) {
          console.log("roundNumberUpdated", json);

          toast.success(`Round Updated Page Will now Refresh`, {
            id: toastId,
            duration: 4000,
          });
          window.location.reload();
        }
        // Handle response
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(`Please Input The Game Number`, {
        id: toastId,
        duration: 4000,
      });
    }
  };

  return (
    <MDBContainer
      fluid
      className="pt-5 pb-5 px-3 mt-5 mb-1 sppayout-container position-relative"
    >
      <Toaster />
      {/* MODAL FOR CONFIRMATION */}
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="sm">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBModalBody>
              <p className="text-white text-center mb-4">{popupMessage}</p>
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
                  color={popupButtonColors}
                  onClick={() => {
                    setPopupModalActions(() => {
                      switch (currentRoomState) {
                        case "open":
                          BettingArenaStatusAction("open");
                          break;
                        case "close":
                          BettingArenaStatusAction("close");
                          break;
                        case "meron":
                          DeclareResultAction("meron");
                          break;
                        case "wala":
                          DeclareResultAction("wala");
                          break;
                        case "draw":
                          DeclareResultAction("draw");
                          break;
                        case "cancel":
                          DeclareResultAction("cancel");
                          break;
                        case "finishRound":
                          ResetAllAction("done round");
                          break;
                        case "standby":
                          NextRoundAction("standby");
                          break;
                        case "redeclare":
                          ReDeclareAction();
                          break;
                        case "updateround":
                          updateRoundNumberAction();
                          break;
                        default:
                          console.log("nothing");
                          break;
                      }
                    });
                  }}
                >
                  {popupButtonMessage}
                </MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* MODAL FOR CONFIRMATION */}
      <div className="sppayout-label px-3">ADMIN CONTROLS:</div>
      <MDBTypography tag="h6" className="text-white">
        Set Betting Status:
      </MDBTypography>
      <MDBContainer
        fluid
        className="px-0 d-flex align-items-center justify-content-around py-3 mb-3"
      >
        {storeRoundStatus.isBettingStatusLoading ? (
          <MDBBtn disabled>
            <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            Loading...
          </MDBBtn>
        ) : (
          <MDBBtn
            className="btn btn-primary"
            onClick={() => OpenArena()}
            disabled={openBettingStatus}
          >
            OPEN
          </MDBBtn>
        )}

        {storeRoundStatus.isBettingStatusLoading ? (
          <MDBBtn disabled className="btn btn-warning">
            <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            Loading...
          </MDBBtn>
        ) : (
          <MDBBtn
            className="btn btn-warning"
            onClick={() => {
              CloseArena();
            }}
            disabled={closeBettingStatus}
          >
            CLOSE
          </MDBBtn>
        )}
      </MDBContainer>

      <MDBTypography tag="h6" className="text-white">
        Declare Result:
      </MDBTypography>

      <MDBContainer
        fluid
        className="align-items-center justify-content-between flex-wrap py-3 mb-3"
      >
        <MDBRow>
          <MDBCol size="6" className="mb-3">
            {storeRoundStatus.isDeclareResultLoading ? (
              <MDBBtn block disabled className="btn btn-danger">
                <MDBSpinner
                  size="sm"
                  role="status"
                  tag="span"
                  className="me-2"
                />
                Loading...
              </MDBBtn>
            ) : (
              <MDBBtn
                block
                className="btn btn-danger"
                disabled={declareResultEnabler}
                onClick={() => DeclareResult("meron")}
              >
                MERON
              </MDBBtn>
            )}
          </MDBCol>
          <MDBCol size="6">
            {storeRoundStatus.isDeclareResultLoading ? (
              <MDBBtn block disabled className="btn btn-primary">
                <MDBSpinner
                  size="sm"
                  role="status"
                  tag="span"
                  className="me-2"
                />
                Loading...
              </MDBBtn>
            ) : (
              <MDBBtn
                block
                className="btn btn-primary"
                disabled={declareResultEnabler}
                onClick={() => DeclareResult("wala")}
              >
                WALA
              </MDBBtn>
            )}
          </MDBCol>
          <MDBCol size="6" hidden={drawEnabler}>
            {storeRoundStatus.isDeclareResultLoading ? (
              <MDBBtn block disabled className="btn btn-success">
                <MDBSpinner
                  size="sm"
                  role="status"
                  tag="span"
                  className="me-2"
                />
                Loading...
              </MDBBtn>
            ) : (
              <MDBBtn
                block
                className="btn btn-success"
                disabled={declareResultEnabler}
                onClick={() => DeclareResult("draw")}
              >
                DRAW
              </MDBBtn>
            )}
          </MDBCol>
          <MDBCol size={drawEnabler ? "12" : "6"}>
            {storeRoundStatus.isDeclareResultLoading ? (
              <MDBBtn block disabled className="btn btn-light">
                <MDBSpinner
                  size="sm"
                  role="status"
                  tag="span"
                  className="me-2"
                />
                Loading...
              </MDBBtn>
            ) : (
              <MDBBtn
                block
                className="btn btn-light"
                disabled={declareResultEnabler}
                onClick={() => DeclareResult("cancel")}
              >
                CANCEL
              </MDBBtn>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBTypography tag="h6" className="text-white">
        Next Fight:
      </MDBTypography>
      <MDBContainer
        fluid
        className="px-0 d-flex align-items-center justify-content-around py-3"
      >
        {storeRoundStatus.payoutButtonLoader ? (
          <MDBBtn disabled>
            <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            Loading...
          </MDBBtn>
        ) : (
          <MDBBtn
            className="btn btn-warning mx-2"
            onClick={() => reDeclare()}
            disabled={resetAllEnabler}
          >
            REDECLARE
          </MDBBtn>
        )}

        {storeRoundStatus.payoutButtonLoader ? (
          <MDBBtn disabled>
            <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            Loading...
          </MDBBtn>
        ) : (
          <MDBBtn
            className="btn btn-primary mx-2"
            onClick={() => ResetAll("payout")}
            disabled={resetAllEnabler}
          >
            FINISH ROUND
          </MDBBtn>
        )}
      </MDBContainer>
      <MDBTypography tag="h6" className="pt-2 text-white">
        Update Round:
      </MDBTypography>

      <MDBContainer
        fluid
        className="px-0 d-flex align-items-center justify-content-around py-3"
      >
        {storeRoundStatus.isNextRoundLoading ? (
          <MDBBtn disabled className="btn btn-success">
            <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            Loading...
          </MDBBtn>
        ) : (
          <MDBBtn
            className="btn btn-success"
            onClick={() => NextRound()}
            disabled={
              // nextRoundEnabler
              storeRoundStatus.roundStatus.status === "open" ||
              storeRoundStatus.roundStatus.status === "close" ||
              storeRoundStatus.roundStatus.status === "standby"
            }
          >
            NEXT ROUND
          </MDBBtn>
        )}
      </MDBContainer>

      <MDBTypography tag="h6" className="pt-4 text-white">
        Update The Round Number:
      </MDBTypography>

      <input
        type="number"
        min="0"
        value={roundDataInput}
        onChange={handleInputChange}
        className="form-control spbets-input-text-admin mt-4"
        disabled={storeRoundStatus.roundStatus.status !== "standby"}
      />

      <MDBContainer
        fluid
        className="px-0 d-flex align-items-center justify-content-around pt-2"
      >
        <MDBBtn
          className="btn btn-success"
          onClick={() => updateRoundNumber()}
          disabled={storeRoundStatus.roundStatus.status !== "standby"}
          // onClick={toggleShowUpdateGameNumber}
          block
        >
          UPDATE GAME NUMBER
        </MDBBtn>
      </MDBContainer>
    </MDBContainer>
  );
};

export default SidePanelBets;
