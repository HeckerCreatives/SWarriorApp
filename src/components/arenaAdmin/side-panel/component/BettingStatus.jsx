import {
  MDBBtn,
  MDBContainer,
  MDBSpinner,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import useAdminArenaStore from "../../../../stores/adminArenaStore";
import Swal from "sweetalert2";

const BettingStatus = () => {
  const arena = useAdminArenaStore(state => state.arena);

  const open = useAdminArenaStore(state => state.openBetting);
  const close = useAdminArenaStore(state => state.closeBetting);
  const loading = useAdminArenaStore(state => state.loading.status);
  const outcome = useAdminArenaStore(state => state.currentRoundOutcome);

  const handleOpenBetting = () => {
    Swal.fire({
      title: "Are you sure you want to open the betting?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        open({ arenaId: arena?._id });
      }
    });
  };

  const handleCloseBetting = () => {
    Swal.fire({
      title: "Are you sure you want to close the betting?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        close({ arenaId: arena?._id });
      }
    });
  };

  return (
    <>
      <MDBTypography tag="h6" className="text-white">
        Set Betting Status:
      </MDBTypography>
      <MDBContainer
        fluid
        className="px-0 d-flex align-items-center justify-content-around py-3 mb-3"
      >
        <MDBBtn
          onClick={handleOpenBetting}
          disabled={
            loading ||
            arena?.bettingStatus === "open" ||
            arena?.bettingStatus === "close" ||
            outcome !== "-"
          }
          className="btn btn-primary"
        >
          {loading ? <MDBSpinner size="sm" color="white" /> : "OPEN"}
        </MDBBtn>
        <MDBBtn
          onClick={handleCloseBetting}
          disabled={
            loading ||
            arena?.bettingStatus === "close" ||
            arena?.bettingStatus === "standby" ||
            outcome !== "-"
          }
          className="btn btn-warning"
        >
          {loading ? <MDBSpinner size="sm" color="white" /> : "CLOSE"}
        </MDBBtn>
      </MDBContainer>
    </>
  );
};

export default BettingStatus;
