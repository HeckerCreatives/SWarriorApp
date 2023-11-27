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

// ** Style
import "./style.css";

// ** Components
import ArenaCard from "./card";
import CashoutHistoryModal from "./CashoutHistoryModal";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { liveArena, setLiveArenaPage } from "../../redux/slices/arena";

const ArenaList = () => {
  // ** Vars
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ** React States
  const [showModal, setShowModal] = useState(false);

  // ** States
  const storeArena = useSelector(state => state.arena);

  useEffect(() => {
    dispatch(
      liveArena(
        `?_start=${
          (storeArena.liveArenaPage - 1) * storeArena.liveArenaItemsPerPage
        }&_limit=${
          storeArena.liveArenaItemsPerPage
        }&_isDeleted_ne=true&_sort=createdAt:DESC`
      )
    );
  }, [storeArena.liveArenaPage, storeArena.liveArenaItemsPerPage]);

  const handlePreviousPage = () => {
    dispatch(setLiveArenaPage(storeArena.liveArenaPage - 1));
  };

  const handleNextPage = () => {
    dispatch(setLiveArenaPage(storeArena.liveArenaPage + 1));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  // const redirectArenaList = () => {
  //   navigate("/player/arenaList");
  // };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/login");
      } else if (result.isDenied) {
      }
    });
  };

  return (
    <MDBContainer fluid className="px-0 main-bg">
      <MDBModal
        className="logout-confimation-modal"
        show={showModal}
        onHide={handleHideModal}
        data-mdb-backdrop="static"
      >
        <MDBModalDialog centered size="md">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBModalBody>
              <p>Are you sure you want to logout?</p>
              <div className="d-flex justify-content-end">
                <MDBBtn
                  color="secondary"
                  className="mx-3"
                  onClick={handleHideModal}
                >
                  Cancel
                </MDBBtn>
                <MDBBtn color="danger" onClick={handleLogout}>
                  Logout
                </MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
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
                <MDBTooltip
                  tag="a"
                  // wrapperProps={{ href: "#" }}
                  title="Refresh Page"
                >
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
                <MDBTooltip
                  tag="a"
                  // wrapperProps={{ href: "#" }}
                  title="Cashout Logs"
                >
                  <CashoutHistoryModal />
                </MDBTooltip>
              </div>
              <div className="px-3" onClick={handleShowModal}>
                <MDBTooltip
                  tag="a"
                  // wrapperProps={{ href: "#" }}
                  title="Sign out"
                >
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
        <button
          className="tc-pager"
          role="button"
          onClick={handlePreviousPage}
          disabled={storeArena.liveArenaPage === 1 || storeArena.tableLoader}
        >
          <MDBIcon fas icon="angle-double-left" />
        </button>
        <div className="tc-page">{storeArena.liveArenaPage}</div>
        <button
          className="tc-pager"
          role="button"
          onClick={handleNextPage}
          disabled={
            storeArena.liveArena.length < storeArena.liveArenaItemsPerPage ||
            storeArena.tableLoader
          }
        >
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center align-items-start">
          {storeArena.tableLoader ? (
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
          )}
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ArenaList;
