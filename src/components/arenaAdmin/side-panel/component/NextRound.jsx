import {
  MDBBtn,
  MDBContainer,
  MDBSpinner,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import useAdminArenaStore from "../../../../stores/adminArenaStore";
import Swal from "sweetalert2";

const NextRound = () => {
  const arena = useAdminArenaStore(state => state.arena);
  const nextRound = useAdminArenaStore(state => state.arenaNextRound);
  const loading = useAdminArenaStore(state => state.loading.nextRound);

  const handleNextRound = () => {
    Swal.fire({
      title: "Are you sure you want to go next round?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        nextRound({ arenaId: arena._id });
      }
    });
  };

  return (
    <>
      <MDBTypography tag="h6" className="pt-2 text-white">
        Update Round:
      </MDBTypography>
      <MDBContainer
        fluid
        className="px-0 d-flex align-items-center justify-content-around pt-3 pb-2"
      >
        <MDBBtn
          onClick={handleNextRound}
          disabled={loading || arena?.bettingStatus !== "close"}
          className="btn btn-success"
        >
          {loading ? <MDBSpinner size="sm" /> : "NEXT ROUND"}
        </MDBBtn>
      </MDBContainer>
    </>
  );
};

export default NextRound;
