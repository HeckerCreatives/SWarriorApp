// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import {
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBSpinner,
  MDBModal,
  MDBModalBody,
  MDBBtn,
  MDBModalContent,
  MDBModalDialog,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "./style.css";
import ArenaCard from "./card";
import CashoutHistoryModal from "./CashoutHistoryModal";

const ArenaList = () => {
  useEffect(() => {}, []);

  return (
    <MDBContainer fluid className="px-0 main-bg">
      <MDBContainer fluid className="px-0 mb-5 custom-topnav-bg">
        <MDBContainer fluid className="px-0 mb-5">
          <MDBCol
            xxl={2}
            xl={4}
            lg={4}
            md={5}
            sm={6}
            size={8}
            className="offset-xxl-10 offset-xl-8 offset-lg-8 py-2 offset-md-7 offset-sm-6 offset-4 topnav-tab-container"
          >
            <div className="d-flex align-items-center ">
              <div className="px-3">
                <MDBTooltip tag="a" title="Refresh Page">
                  <MDBIcon
                    fas
                    icon="redo-alt"
                    size="xl"
                    role="button"
                    onClick={() => window.location.reload()}
                  />
                </MDBTooltip>
              </div>
              <div className="px-3">
                <MDBTooltip tag="a" title="Cashout Logs">
                  <CashoutHistoryModal />
                </MDBTooltip>
              </div>
              <div className="px-3">
                <MDBTooltip tag="a" title="Sign out">
                  <MDBIcon fas icon="sign-out-alt" size="xl" role="button" />
                </MDBTooltip>
              </div>
            </div>
          </MDBCol>
        </MDBContainer>
        <MDBContainer fluid className="px-0 topnav-title-container ps-4 pt-2">
          <MDBTypography tag="h2" className="text-warning text-center">
            SELECT ARENA
          </MDBTypography>
        </MDBContainer>
      </MDBContainer>
      <MDBContainer className="px-0 mb-3 d-flex align-items-center justify-content-center">
        <button className="tc-pager" role="button">
          <MDBIcon fas icon="angle-double-left" />
        </button>
        <div className="tc-page">{1}</div>
        <button className="tc-pager" role="button">
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center align-items-start">
          {/* {storeArena.tableLoader ? (
            <div className="d-flex justify-content-center">
              <MDBSpinner role="status" color="light">
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            </div>
          ) : storeArena.liveArena?.length ? (
            storeArena.liveArena?.map((item, i) => (
              <ArenaCard key={`tr-${i}`} data={item} />
            ))
          ) : (
            <div className="d-flex justify-content-center text-white">
              No Result Found.
            </div>
          )} */}
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ArenaList;
