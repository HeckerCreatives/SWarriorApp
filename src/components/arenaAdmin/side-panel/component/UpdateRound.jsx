import { MDBBtn, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useRef } from "react";
import useAdminArenaStore from "../../../../stores/adminArenaStore";
import { errToast } from "../../../../utility/toaster";
import Swal from "sweetalert2";

const UpdateRound = () => {
  const roundRef = useRef(null);

  const arena = useAdminArenaStore(state => state.arena);

  const updateRound = useAdminArenaStore(state => state.arenaUpdateRound);
  const reset = useAdminArenaStore(state => state.resetSuccess);
  const success = useAdminArenaStore(state => state.success.setRound);
  const loading = useAdminArenaStore(state => state.loading.setRound);

  useEffect(() => {
    roundRef.current.value = "";
    reset();
  }, [success]);

  const handleSetRound = () => {
    const roundNumber = roundRef.current.value;

    if (isNaN(roundNumber)) {
      errToast("Please enter a valid round number.");
      return;
    }

    Swal.fire({
      title: `Are you sure you want to go set this round to ${roundNumber}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        updateRound({ arenaId: arena._id, roundNumber });
      }
    });
  };

  return (
    <>
      <MDBTypography tag="h6" className="pt-4 text-white">
        Update The Round Number:
      </MDBTypography>
      <input
        ref={roundRef}
        type="number"
        min="0"
        className="form-control spbets-input-text-admin mt-4"
      />
      <MDBContainer
        fluid
        className="px-0 d-flex align-items-center justify-content-around pt-2"
      >
        <MDBBtn
          onClick={handleSetRound}
          disabled={loading || arena?.bettingStatus !== "standby"}
          className="btn btn-success"
        >
          UPDATE GAME NUMBER
        </MDBBtn>
      </MDBContainer>
    </>
  );
};

export default UpdateRound;
