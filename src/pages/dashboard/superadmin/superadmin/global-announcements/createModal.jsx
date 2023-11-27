import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModal,
  MDBTypography,
  MDBInput,
  MDBFile,
  MDBTextArea,
  MDBSpinner,
} from "mdb-react-ui-kit";
import toast, { Toaster } from "react-hot-toast";
import { errToast } from "../../../../../utility/toaster";
import useAnnouncementStore from "../../../../../stores/announcementStore";
import { useEffect } from "react";

const CreateModal = () => {
  const [centredModal, setCentredModal] = useState(false);

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);

  const toggleShow = () => setCentredModal(!centredModal);

  const create = useAnnouncementStore(state => state.createAnnouncement);
  const reset = useAnnouncementStore(state => state.resetSuccess);
  const loading = useAnnouncementStore(state => state.loading.create);
  const success = useAnnouncementStore(state => state.success.create);

  useEffect(() => {
    if (success) {
      setPreview("");
      if (file) document.getElementById("formFileSm").value = "";
      setFile(null);
      setCentredModal(false);
      reset();
    }
  }, [success]);

  const handleSubmit = async event => {
    event.preventDefault();

    const { title, description } = event.target;

    if (!file) {
      errToast("Please select an image.");
      return;
    }

    if (title.value === "") {
      errToast("Please add a title.");
      return;
    }

    if (description.value === "") {
      errToast("Please add a description");
      return;
    }

    const annoucementData = new FormData();
    annoucementData.append("title", title.value);
    annoucementData.append("description", description.value);
    file && annoucementData.append("announcementImage", file);

    create(annoucementData);
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };
  return (
    <>
      <MDBBtn
        className="bg-light text-dark  afl-btn afl-btn-1 mt-1"
        onClick={toggleShow}
      >
        <MDBIcon far icon="plus-square" /> Create Announcement
      </MDBBtn>
      <form id="myForm" autoComplete="off" onSubmit={handleSubmit}>
        <MDBModal
          staticBackdrop
          tabIndex="-1"
          show={centredModal}
          setShow={setCentredModal}
        >
          <MDBModalDialog centered size="lg" scrollable>
            <MDBModalContent className="coreq-modal-body py-2">
              <MDBTypography
                tag="h5"
                className="text-start ms-5 pt-4 coreq-modal-title"
              >
                Create Announcement
              </MDBTypography>
              <hr className="hr" />
              <MDBBtn
                type="button"
                color="tranparent"
                onClick={toggleShow}
                disabled={loading}
                className="coreq-modal-close-btn shadow-0"
              >
                <MDBIcon fas icon="times" size="4x" />
              </MDBBtn>

              <MDBModalBody className="text-center">
                <MDBInput
                  className="text-light dashboard-bg"
                  label="Announcement Title"
                  id="formWhite"
                  contrast
                  type="text"
                  name="title"
                  required
                />

                <div className="mt-5">
                  {preview && (
                    <img
                      src={preview}
                      alt="Selected"
                      style={{ maxWidth: "400px", borderRadius: "15px" }}
                    />
                  )}
                </div>

                <div
                  className="text-center bg-light pt-2 mt-5 square bg-primary rounded-pill"
                  style={{ width: "150px", marginLeft: "310px" }}
                >
                  <MDBFile
                    label="Upload Image"
                    size="sm"
                    id="formFileSm"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                    name="media"
                  />
                </div>

                <hr className="hr" style={{ backgroundColor: "#fff" }} />
                <h6 className="text-light">Message Description</h6>
                <MDBContainer fluid className="p-3 variance-body w-100">
                  <div>
                    <MDBTextArea
                      className="text-light square border border-light"
                      id="formWhite"
                      contrast
                      rows={6}
                      size="lg"
                      name="description"
                      required
                    />
                  </div>
                </MDBContainer>
                <hr className="hr" />
                <MDBContainer className="text-end">
                  <div>
                    <MDBBtn
                      disabled={loading}
                      type="submit"
                      className="bg-success"
                    >
                      {loading ? <MDBSpinner size="sm" /> : "submit"}
                    </MDBBtn>
                    <MDBBtn
                      disabled={loading}
                      type="button"
                      className="ms-3 bg-danger"
                      onClick={toggleShow}
                    >
                      cancel
                    </MDBBtn>
                  </div>
                </MDBContainer>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </form>
    </>
  );
};

export default CreateModal;
