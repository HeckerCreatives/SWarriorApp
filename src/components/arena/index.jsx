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
import { socket } from "../../configs/socket";
import Swal from "sweetalert2";

// import sgLogo from '../../assets/images/logo.png'
// import ArenaNotification from "./notification";

const Arena = () => {
  useEffect(() => {
    socket.emit("joinArena", { arenaId: "arenaId" });
    return () => {
      socket.emit("leaveArena", { arenaId: "arenaId" });
    };
  }, []);

  useEffect(() => {
    socket.on("connect_error", () => {
      // connection error here
    });
  }, []);

  return (
    <MDBContainer fluid className="px-0 main-bg">
      <Toaster reverseOrder={false} />
      <ArenaHeader />

      <MDBContainer fluid>
        <p style={{ color: "#fbf201" }} className="m-0">
          Live Title(Event Name) - Date Locale String
        </p>
        <p className="text-white m-0">Date Locale String</p>
      </MDBContainer>

      {/* Mobile View Betting */}
      <MDBRow className="mx-2 mt-2 mobile-view-betting">
        <MDBCol xxl={9} xl={8} lg={7} className="px-1">
          <MDBContainer fluid className="p-1 mt-0 mb-1 arena-vid-wrapper">
            <MDBContainer fluid className="px-3 arena-vid-container">
              <div className="arena-dummy-vid">{1}</div>
            </MDBContainer>
          </MDBContainer>

          <MDBContainer id="arenaDisplayer" className=" mt-3">
            <div className="bg-warning text-center">
              <p className="p-2">
                <strong>Arena Message</strong>
              </p>
            </div>
          </MDBContainer>
          <MDBRow className="px-0">
            <MDBCol size={6} xxl={3} xl={3} lg={3}>
              <ArenaHeaderStatus />
            </MDBCol>
            <MDBCol size={6} xxl={2} xl={2} lg={2}>
              <ArenaRoundHeader item={1} />
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
              <ArenaTotalBetHeader data="Round Status" />
            </MDBCol>
            <MDBCol size={6} xxl={3} xl={3} lg={3} className="order-lg-1">
              <ArenaHeaderStatus />
            </MDBCol>
            <MDBCol size={6} xxl={2} xl={2} lg={2} className="order-lg-3">
              <ArenaRoundHeader item={1} />
            </MDBCol>
          </MDBRow>
          <MDBContainer fluid className="p-3 arena-vid-wrapper">
            <MDBContainer fluid className="px-3 arena-vid-container">
              <div className="arena-dummy-vid">Arena Latency</div>
            </MDBContainer>
          </MDBContainer>

          <MDBContainer fluid id="arenaDisplayer" className=" mt-3">
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
        <MDBRow className="mx-0 mt-3">
          <MDBCol xxl={3} xl={3} lg={3} md={4} sm={5} size={6}>
            <ArenaBalanceAmount amount={100} />
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
            <ArenaDrawAmount />
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
