// ** React
import { useState } from "react";

// ** Third Party Components
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  updateArenaVideo,
  allArenaVideos,
} from "../../../../../redux/slices/arenaVideos";

const EditVideoModal = (item) => {
  // ** Vars
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  // ** Store
  const storeArenaVideos = useSelector((state) => state.arenaVideos);

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();

    const { videoName, lowLatencyCode, compatibilityCode } = e.target;

    const data = {
      id: item.data.id,
      videoName: videoName.value,
      lowLatencyCode: lowLatencyCode.value,
      compatibilityModeCode: compatibilityCode.value,
    };

    try {
      const response = await dispatch(updateArenaVideo(data));

      if (response.type === "arenaVideos/fulfilled") {
        toast.success(`Video Updated`, {
          id: toastId,
        });
        await dispatch(
          allArenaVideos(
            `?_start=${
              (storeArenaVideos.currentPage - 1) * storeArenaVideos.itemsPerPage
            }&_limit=${storeArenaVideos.itemsPerPage}`
          )
        );
        await setCentredModal(false);
      } else {
        toast.error("Something went wrong please try again", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again", {
        id: toastId,
      });
    }
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
                      type="text"
                      className="form-control cvform-input"
                      defaultValue={item.data.videoName}
                      placeholder="Video Name"
                      name="videoName"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control cvform-input"
                      defaultValue={item.data.lowLatencyCode}
                      placeholder="Low Latency (WEB RTC) Embed Code"
                      name="lowLatencyCode"
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control cvform-input"
                      defaultValue={item.data.compatibilityModeCode}
                      placeholder="Compatibility (HLS) Embed Code"
                      name="compatibilityCode"
                      rows="5"
                    ></textarea>
                  </div>
                  <MDBBtn className="cvform-submit-btn" role="button">
                    <MDBIcon fas icon="plus" /> UPDATE VIDEO
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
