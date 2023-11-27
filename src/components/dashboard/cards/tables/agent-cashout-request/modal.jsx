import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBSpinner,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState } from "react";
import useCashoutStore from "../../../../../stores/cashoutStore";
import Swal from "sweetalert2";
import { useEffect } from "react";

const AgentCashoutRequestModal = ({ request }) => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const approveReject = useCashoutStore(
    state => state.agentApproveRejectRequest
  );
  const reset = useCashoutStore(state => state.resetSuccess);
  const loading = useCashoutStore(state => state.loading.status);
  const success = useCashoutStore(state => state.success.status);

  useEffect(() => {
    if (success) {
      setCentredModal(false);
      reset();
    }
  }, [success]);

  const handleApprove = () => {
    Swal.fire({
      title: "Are you sure you want to approve this request?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const approveData = {
          cashoutId: request._id,
        };
        approveReject(approveData, "approve");
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: "Are you sure you want to reject this request?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const approveData = {
          cashoutId: request._id,
        };
        approveReject(approveData, "reject");
      }
    });
  };

  return (
    <>
      <div
        onClick={toggleShow}
        className="coreq-process text-truncate"
        role="button"
      >
        <MDBIcon fas icon="cogs" /> PROCESS
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> PROCESS CASHOUT
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer className="pt-3 pb-5 coreq-modal-panel">
                  <MDBTypography tag="h4">
                    {request.owner.username}
                  </MDBTypography>
                  <MDBTypography tag="h3">
                    {Number(request.amount).toFixed(2)}
                  </MDBTypography>
                </MDBContainer>
                <div className="coreq-modal-warning d-flex align-items-center justify-content-center">
                  <div className="coreq-modal-warning-icon">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="coreq-modal-warning-label">
                    {`Approving this request will automatically generate a
                    WITHDRAW transaction for ${request.owner.username}`}
                  </div>
                </div>
              </MDBContainer>

              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  onClick={handleApprove}
                  disabled={loading}
                  className="coreq-modal-approve"
                >
                  {loading ? (
                    <MDBSpinner size="sm" />
                  ) : (
                    <>
                      <MDBIcon fas icon="check" /> APPROVE
                    </>
                  )}
                </MDBBtn>

                <MDBBtn
                  onClick={handleReject}
                  disabled={loading}
                  className="coreq-modal-deny"
                >
                  {loading ? (
                    <MDBSpinner size="sm" />
                  ) : (
                    <>
                      <MDBIcon fas icon="times" /> DENY
                    </>
                  )}
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default AgentCashoutRequestModal;
