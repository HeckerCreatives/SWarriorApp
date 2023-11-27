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
import { Toaster } from "react-hot-toast";
import useAgentStore from "../../../../../../stores/agentStore";
import { useEffect } from "react";

const PlayerDeactivate = ({ agent }) => {
  const [approveModal, setCentredApproveModal] = useState(false);
  const toggleShowApprove = () => setCentredApproveModal(!approveModal);

  const ban = useAgentStore(state => state.agentBanUser);
  const reset = useAgentStore(state => state.resetSuccess);
  const loading = useAgentStore(state => state.loading.ban);
  const success = useAgentStore(state => state.success.ban);

  useEffect(() => {
    reset();
    setCentredApproveModal(false);
  }, [success]);

  const handleBan = () => {
    const banData = {
      userId: agent._id,
    };
    ban(banData);
  };

  return (
    <>
      <Toaster />
      <MDBBtn
        className="text-warning pat2r-btn shadow-0 me-2"
        onClick={toggleShowApprove}
      >
        <MDBIcon fas icon="lock" size="xl" />
      </MDBBtn>

      <MDBModal
        tabIndex="-1"
        show={approveModal}
        setShow={setCentredApproveModal}
      >
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="pat3-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 pat3-modal-title-approved"
            >
              <MDBIcon fas icon="cogs" /> Ban User
            </MDBTypography>

            <MDBBtn
              color="tranparent"
              onClick={toggleShowApprove}
              className="pat3-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer className="pt-3 pb-5 pat3-modal-panel"></MDBContainer>

                <div className="pat3-modal-warning d-flex align-items-center justify-content-center">
                  <div className="pat3-modal-warning-icon m-0">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="pat3-modal-warning-label text-wrap">
                    {`Are you sure you want to Ban ${agent.username}?`}
                  </div>
                </div>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  onClick={handleBan}
                  disabled={loading}
                  className="pat3-modal-approve"
                >
                  {loading ? (
                    <MDBSpinner size="sm" />
                  ) : (
                    <>
                      <MDBIcon fas icon="check" /> Ban This User
                    </>
                  )}
                </MDBBtn>

                <MDBBtn
                  disabled={loading}
                  className="pat3-modal-default"
                  onClick={toggleShowApprove}
                >
                  <MDBIcon fas icon="times" /> CANCEL
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PlayerDeactivate;
