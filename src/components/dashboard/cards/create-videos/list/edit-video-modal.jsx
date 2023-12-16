// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
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
import useVideoStore from "../../../../../stores/videoStore";

const EditVideoModal = ({ data }) => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const update = useVideoStore(state => state.updateVideo);
  const reset = useVideoStore(state => state.resetSuccess);
  const success = useVideoStore(state => state.success.update);
  const loading = useVideoStore(state => state.loading.update);

  useEffect(() => {
    if (success) {
      setCentredModal(false);
      reset();
    }
  }, [success]);

  const handleSubmit = e => {
    e.preventDefault();

    const { videoName, videoUrl } = e.target;

    if (videoName.value === "") {
      errToast("Video name is required.");
      return;
    }

    if (videoUrl.value === "") {
      errToast("Video url is required.");
      return;
    }

    update({
      videoId: data._id,
      name: videoName.value,
      url: videoUrl.value,
    });
  };

  return (
    <>
      <MDBBtn
        className="cvitem-btn cvitem-btn-2"
        onClick={toggleShow}
        role="button"
      >
        <MDBIcon fas icon="edit" /> EDIT
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> Edit Created Video
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
                <form onSubmit={handleSubmit} id="myform" autoComplete="off">
                  <div className="mb-3">
                    <input
                      disabled={loading}
                      type="text"
                      className="form-control cvform-input"
                      defaultValue={data.name}
                      placeholder="Video Name"
                      name="videoName"
                    />
                  </div>
                  {/* <div className="mb-3">
                    <textarea
                      className="form-control cvform-input"
                      defaultValue={item.data.lowLatencyCode}
                      placeholder="Low Latency (WEB RTC) Embed Code"
                      name="lowLatencyCode"
                      rows="5"
                    ></textarea>
                  </div> */}
                  <div className="mb-3">
                    <textarea
                      disabled={loading}
                      className="form-control cvform-input"
                      defaultValue={data.url}
                      placeholder="Compatibility (HLS) Embed Code"
                      name="videoUrl"
                      rows="5"
                    ></textarea>
                  </div>
                  <MDBBtn disabled={loading} className="cvform-submit-btn">
                    {loading ? (
                      <MDBSpinner size="sm" />
                    ) : (
                      <>
                        <MDBIcon fas icon="plus" /> UPDATE VIDEO
                      </>
                    )}
                  </MDBBtn>
                </form>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditVideoModal;
