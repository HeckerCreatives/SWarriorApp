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
import { useEffect, useState } from "react";
import useArenaStore from "../../../../../stores/arenaStore";

const CloseArenaModal = ({ data }) => {
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  const remove = useArenaStore(state => state.deleteArena);
  const reset = useArenaStore(state => state.resetSuccess);
  const loading = useArenaStore(state => state.loading.remove);
  const success = useArenaStore(state => state.success.remove);

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success]);

  const handleDelete = () => {
    remove(data._id);
  };

  return (
    <>
      <MDBIcon
        far
        icon="trash-alt"
        size="xl"
        className="text-warning shadow-sm la-icon-btn"
        onClick={toggleShow}
        role="button"
      />

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> CLOSING ARENA
            </MDBTypography>
            <MDBBtn
              disabled={loading}
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer className="pt-3 pb-5 coreq-modal-panel text-center">
                  <MDBTypography className="text-white" tag="h4">
                    {data.eventName}
                  </MDBTypography>
                </MDBContainer>
                <div className="coreq-modal-warning d-flex align-items-center justify-content-center">
                  <div className="coreq-modal-warning-icon">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="coreq-modal-warning-label text-wrap">
                    Are you certain you want to close this arena? You will not
                    be able to undo this after updating.
                  </div>
                </div>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  disabled={loading}
                  onClick={handleDelete}
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
                  disabled={loading}
                  className="coreq-modal-deny"
                  onClick={toggleShow}
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

export default CloseArenaModal;
