import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import useAdminArenaStore from "../../../../stores/adminArenaStore";
import { errToast } from "../../../../utility/toaster";
import Swal from "sweetalert2";

const DeclareResult = () => {
  const arena = useAdminArenaStore(state => state.arena);
  const finishRound = useAdminArenaStore(state => state.arenaFinishRound);
  const reset = useAdminArenaStore(state => state.resetSuccess);
  const success = useAdminArenaStore(state => state.success.nextRound);
  const currentOutcome = useAdminArenaStore(state => state.currentRoundOutcome);

  const [outcome, setOutcome] = useState("");

  useEffect(() => {
    if (success) {
      setOutcome("");
      reset();
    }
  }, [success]);

  useEffect(() => {
    if (currentOutcome !== "-") {
      setOutcome(currentOutcome);
    }
  }, [currentOutcome]);

  const handleFinishRound = () => {
    if (outcome === "") {
      errToast("Please select result to declare");
      return;
    }

    Swal.fire({
      title: "Are you sure you want to finish this round?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const roundData = {
          arenaId: arena._id,
          result: outcome,
        };
        finishRound(roundData);
      }
    });
  };

  return (
    <>
      <MDBTypography tag="h6" className="text-white">
        Declare Result:
      </MDBTypography>

      <MDBContainer
        fluid
        className="align-items-center justify-content-between flex-wrap py-3 mb-3"
      >
        <MDBRow>
          <MDBCol size="6" className="mb-3">
            <MDBBtn
              block
              onClick={() => setOutcome("meron")}
              disabled={
                (outcome !== "" && outcome !== "meron") ||
                arena?.bettingStatus !== "close"
              }
              className={`btn btn-success ${
                outcome === "meron" && "border border-3"
              }`}
            >
              MERON
            </MDBBtn>
          </MDBCol>
          <MDBCol size="6">
            <MDBBtn
              block
              onClick={() => setOutcome("wala")}
              disabled={
                (outcome !== "" && outcome !== "wala") ||
                arena?.bettingStatus !== "close"
              }
              className={`btn btn-danger ${
                outcome === "wala" && "border border-3"
              }`}
            >
              WALA
            </MDBBtn>
          </MDBCol>
          {arena?.drawEnabled && (
            <MDBCol size="6">
              <MDBBtn
                block
                onClick={() => setOutcome("draw")}
                disabled={
                  (outcome !== "" && outcome !== "draw") ||
                  arena?.bettingStatus !== "close"
                }
                className={`btn btn-primary ${
                  outcome === "draw" && "border border-3"
                }`}
              >
                DRAW
              </MDBBtn>
            </MDBCol>
          )}
          <MDBCol size={arena?.drawEnabled ? 6 : 12}>
            <MDBBtn
              block
              onClick={() => setOutcome("cancel")}
              disabled={
                (outcome !== "" && outcome !== "cancel") ||
                arena?.bettingStatus !== "close"
              }
              className={`btn btn-light ${
                outcome === "cancel" && "border border-3"
              }`}
            >
              CANCEL
            </MDBBtn>
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
        <MDBBtn
          disabled={currentOutcome !== "-" || arena?.bettingStatus !== "close"}
          onClick={() => setOutcome("")}
          className="btn btn-warning mx-2"
        >
          REDECLARE
        </MDBBtn>
        <MDBBtn
          disabled={currentOutcome !== "-" || arena?.bettingStatus !== "close"}
          onClick={handleFinishRound}
          className="btn btn-primary mx-2"
        >
          FINISH ROUND
        </MDBBtn>
      </MDBContainer>
    </>
  );
};

export default DeclareResult;
