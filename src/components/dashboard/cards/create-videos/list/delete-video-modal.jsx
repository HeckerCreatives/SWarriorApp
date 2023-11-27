// ** React
import { useState } from "react";

// ** Third Party Components
import {
  MDBBtn,
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
  deleteArenaVideo,
  allArenaVideos,
} from "../../../../../redux/slices/arenaVideos";

const DeleteVideoModal = (item) => {
  // ** Vars
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  // ** Store
  const storeArenaVideos = useSelector((state) => state.arenaVideos);

  const handleDelete = async () => {
    const toastId = toast.loading("Loading...");

    const data = {
      id: item.data.id,
    };

    try {
      const response = await dispatch(deleteArenaVideo(data));

      if (response.type === "arenaVideos/fulfilled") {
        toast.success(`Video Deleted`, {
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
        className="cvitem-btn cvitem-btn-3"
        onClick={toggleShow}
        role="button"
      >
        <MDBIcon fas icon="trash-alt" /> DELETE
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> DELETING VIDEO
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>
            <MDBModalBody>
              <MDBTypography
                variant="h3"
                className="text-white text-center m-3"
              >
                <small>
                  Are you sure you want to delete{" "}
                  <MDBTypography tag="mark">
                    {item.data.videoName}
                  </MDBTypography>{" "}
                  video?
                </small>
              </MDBTypography>

              <div className="mt-5 text-center">
                <MDBBtn
                  color="danger"
                  className="mx-2 fw-bold"
                  role="button"
                  onClick={handleDelete}
                >
                  <MDBIcon fas icon="trash" />
                  &nbsp;&nbsp;Delete
                </MDBBtn>
                <MDBBtn className="fw-bold" role="button" onClick={toggleShow}>
                  &nbsp;&nbsp;Cancel
                </MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default DeleteVideoModal;
