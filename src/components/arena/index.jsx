// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Components
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

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { setOneArena, setArenaGameHistory } from "../../redux/slices/arena";
import { setStatus } from "../../redux/slices/roundStatus";
import { ME } from "../../redux/slices/users";
import {
  setTeams,
  setCurrentBet,
  myCurrentBet,
} from "../../redux/slices/currentRoundBets";
// import sgLogo from '../../assets/images/logo.png'
// import ArenaNotification from "./notification";

const Arena = () => {
  // ** Vars
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const arena_id = urlParams.get("arena_id");
  console.log("arenaID Is?", arena_id);
  // ** Login User
  const auth = "";

  // ** Redux States
  const storeArena = useSelector(state => state.arena);
  const storeUsers = useSelector(state => state.users);
  const storeRoundStatus = useSelector(state => state.roundStatus);

  // arena Message
  const roundStats = storeRoundStatus.roundStatus.status;

  let [arenaMessage, setArenaMessage] = useState(null);
  console.log("theRoundStatutsTESTER!!@#$", storeArena);

  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  useEffect(() => {
    const openMessage = "BETTING IS NOW OPEN. PLACE YOUR BET";
    const closeMessage = "120 AND BELOW SHALL BE CANCEL FIGHT";
    const standByMessage = "STANBY FOR THE NEXT FIGHT";

    if (storeRoundStatus.roundStatus.status === "open") {
      setArenaMessage(openMessage);
    } else if (storeRoundStatus.roundStatus.status === "close") {
      setArenaMessage(closeMessage);
    } else if (storeRoundStatus.roundStatus.status === "standby") {
      setArenaMessage(standByMessage);
    } else {
    }
  }, [storeRoundStatus.roundStatus.status]);

  useEffect(() => {
    dispatch(ME(auth.user.id));
  }, []);

  const roundStatusOutcomeHandler = data => {
    dispatch(setStatus(data));
    // console.log('this is the rounstatus outcome handler data', data)
    const toastId = toast.success(
      () => (
        <span>
          Round is now{" "}
          <b style={{ textTransform: "capitalize" }}>{data.status}</b>
        </span>
      ),
      { toastId: "roundStatus" }
    );
    if (data.status === "standby") {
      window.location.reload();
    }
  };

  const getGameHistoryOutcomeHandler = data => {
    dispatch(setArenaGameHistory(data));
  };

  const roundOutcomeResponseHandler = data => {
    if (data.success) {
    }
  };

  const roundSettingsNextOutcomeHandler = data => {
    dispatch(setStatus(data));
  };

  const roundPayoutOutcomeHandler = () => {
    dispatch(setCurrentBet(""));
  };

  const getRoundStatusOutcomeHandler = data => {
    dispatch(setStatus(data));
  };

  const getCurrentRoundBetsOutcomeHandler = data => {
    dispatch(setTeams(data));
  };

  const getArenaOutcomeHandler = async data => {
    dispatch(setOneArena(data));
  };

  //  ============================================

  return (
    <MDBContainer fluid className="px-0 main-bg">
      <Toaster reverseOrder={false} />
      <ArenaHeader />

      <MDBContainer fluid>
        <p style={{ color: "#fbf201" }} className="m-0">
          Live Title({storeArena.findOneArena.eventName}) -{" "}
          {new Date(storeArena.findOneArena.createdAt).toLocaleString()}
        </p>
        <p className="text-white m-0">
          {new Date(storeArena.findOneArena.createdAt).toLocaleString()}
        </p>
      </MDBContainer>

      {/* --------------------------------------------------------------------------------------------- */}

      {/* <div className="bg-warning text-center" ><p className="p-2"><strong>{arenaMessage}</strong></p></div> */}

      {/* Mobile View Betting */}
      <MDBRow className="mx-2 mt-2 mobile-view-betting">
        <MDBCol xxl={9} xl={8} lg={7} className="px-1">
          <MDBContainer fluid className="p-1 mt-0 mb-1 arena-vid-wrapper">
            <MDBContainer fluid className="px-3 arena-vid-container">
              <div className="arena-dummy-vid">
                {parse(
                  storeArena.findOneArena?.arena_video_id
                    ?.compatibilityModeCode ||
                    storeArena.findOneArena?.arena_video_id?.lowLatencyCode ||
                    ""
                )}
              </div>
            </MDBContainer>
          </MDBContainer>

          <MDBContainer id="arenaDisplayer" className=" mt-3">
            <div className="bg-warning text-center">
              <p className="p-2">
                <strong>{arenaMessage}</strong>
              </p>
            </div>
          </MDBContainer>
          <MDBRow className="px-0">
            <MDBCol size={6} xxl={3} xl={3} lg={3}>
              <ArenaHeaderStatus />
            </MDBCol>
            <MDBCol size={6} xxl={2} xl={2} lg={2}>
              <ArenaRoundHeader data={storeRoundStatus.roundStatus} />
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol xxl={3} xl={4} lg={5} className="px-1">
          <ArenaSidePanelMobile />
        </MDBCol>
      </MDBRow>

      {/* Desktop */}
      <MDBRow className="mx-2 mt-3 desktop-view-betting">
        <MDBCol xxl={9} xl={8} lg={7} className="px-1">
          <MDBRow className="px-0">
            <MDBCol xxl={7} xl={7} lg={7} className="px-lg-0 order-lg-2">
              <ArenaTotalBetHeader data={storeRoundStatus.roundStatus} />
            </MDBCol>
            <MDBCol size={6} xxl={3} xl={3} lg={3} className="order-lg-1">
              <ArenaHeaderStatus />
            </MDBCol>
            <MDBCol size={6} xxl={2} xl={2} lg={2} className="order-lg-3">
              <ArenaRoundHeader data={storeRoundStatus.roundStatus} />
            </MDBCol>
          </MDBRow>
          <MDBContainer fluid className="p-3 arena-vid-wrapper">
            <MDBContainer fluid className="px-3 arena-vid-container">
              <div className="arena-dummy-vid">
                {parse(
                  storeArena.findOneArena?.arena_video_id
                    ?.compatibilityModeCode ||
                    storeArena.findOneArena?.arena_video_id?.lowLatencyCode ||
                    ""
                )}
              </div>
            </MDBContainer>
          </MDBContainer>

          <MDBContainer fluid id="arenaDisplayer" className=" mt-3">
            <div className="bg-warning text-center">
              <p className="p-2">
                <strong>{arenaMessage}</strong>
              </p>
            </div>
          </MDBContainer>
        </MDBCol>
        <MDBCol xxl={3} xl={4} lg={5} className="px-1">
          <ArenaSidePanel />
        </MDBCol>
        <MDBRow className="mx-0 mt-3">
          <MDBCol xxl={3} xl={3} lg={3} md={4} sm={5} size={6}>
            {/* <ArenaBalanceAmount amount={storeUsers.me?.points} /> */}
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
            {/* <ArenaDrawAmount /> */}
          </MDBCol>
        </MDBRow>
      </MDBRow>

      <MDBRow className="mx-0 mt-3">
        <BettingHistory />
        <MDBContainer className="d-flex align-items-center justify-content-center flex-wrap mt-5">
          <MDBRow>
            <MDBCol>
              <div className="mx-5 d-flex align-items-center flex-column">
                <span
                  className={`my-2 square bg-danger rounded-circle p-4 text-center betting-history-icon`}
                >
                  M
                </span>
                <h6 className="mt-2 text-white">MERON</h6>
              </div>
            </MDBCol>
            <MDBCol>
              <div className="mx-5 d-flex align-items-center flex-column">
                <span
                  className={`my-2 square bg-primary rounded-circle p-4 text-center betting-history-icon`}
                >
                  W
                </span>
                <h6 className="mt-2 text-white">WALA</h6>
              </div>
            </MDBCol>
            <MDBCol>
              <div className="mx-5 d-flex align-items-center flex-column">
                <span
                  className={`my-2 square bg-success rounded-circle p-4 text-center betting-history-icon`}
                >
                  D
                </span>
                <h6 className="mt-2 text-white">DRAW</h6>
              </div>
            </MDBCol>
            <MDBCol>
              <div className="mx-5 d-flex align-items-center flex-column">
                <span
                  className={`my-2 square bg-light text-dark rounded-circle p-4 text-center betting-history-icon`}
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
  );
};

export default Arena;
