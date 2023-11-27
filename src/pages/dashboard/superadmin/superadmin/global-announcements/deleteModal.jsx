import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModal,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { IMAGE_ENDPOINT } from "../../../../../utility/utils";
import useAnnouncementStore from "../../../../../stores/announcementStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const DeleteModal = ({ annc }) => {
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  const remove = useAnnouncementStore(state => state.deleteAnnouncement);
  const reset = useAnnouncementStore(state => state.resetSuccess);
  const loading = useAnnouncementStore(state => state.loading.remove);
  const success = useAnnouncementStore(state => state.success.remove);

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success]);

  const handleRemove = () => {
    remove(annc._id);
  };

  return (
    <>
      <MDBBtn
        className="bg-danger text-dark ms-0 afl-btn afl-btn-1"
        onClick={toggleShow}
      >
        <MDBIcon far icon="trash-alt" />
      </MDBBtn>

      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={centredModal}
        setShow={setCentredModal}
      >
        <MDBModalDialog centered size="lg" scrollable>
          <MDBModalContent className="pat3-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 pat3-modal-title-deny"
            >
              <MDBIcon fas icon="cogs" /> DELETE THIS ANNOUNCEMENT?
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              disabled={loading}
              onClick={toggleShow}
              className="pat3-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBTypography tag="h4" className="mt-5 text-warning">
                  {annc.title}
                </MDBTypography>
                <div className="mt-5">
                  <img
                    src={`${IMAGE_ENDPOINT}${annc.image}`}
                    alt="Selected"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "300px",
                      borderRadius: "15px",
                    }}
                  />
                </div>
                <MDBContainer className="pt-3 mb-5 mt-5 pb-5 pat3-modal-panel">
                  <MDBTypography tag="h4" className="text-secondary">
                    {annc.description}
                  </MDBTypography>
                </MDBContainer>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  onClick={handleRemove}
                  disabled={loading}
                  className="pat3-modal-deny"
                >
                  {loading ? (
                    <MDBSpinner size="sm" />
                  ) : (
                    <>
                      <MDBIcon fas icon="check" /> YES
                    </>
                  )}
                </MDBBtn>
                <MDBBtn
                  disabled={loading}
                  className="pat3-modal-default"
                  onClick={toggleShow}
                >
                  <MDBIcon fas icon="times" /> NO
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default DeleteModal;
