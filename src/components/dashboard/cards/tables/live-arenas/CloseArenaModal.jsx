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
import { useState } from "react";
import toast from "react-hot-toast";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { updateArena, liveArena } from "../../../../../redux/slices/arena";

const CloseArenaModal = (item) => {
  // ** Vars
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => {
    if (item.data.length === 0) {
      toast.error("Please Select Arena To Be Closed", {
        duration: 3000,
      });
    } else {
      setCentredModal(!centredModal);
    }
  };

  const storeArena = useSelector((state) => state.arena);
  
  const processCashoutHandle = async (e) => {
  
    const toastId = toast.loading("Loading...");
    const data = {
      id: item.data.id,
      isDeleted: true,
    };

    try {
      const response = await dispatch(updateArena(data));

      if (response.type === "arenas/fulfilled") {
        toast.success(`Arena Closed.`, {
          id: toastId,
        });
        dispatch(liveArena(
          `?_start=${
            (storeArena.liveArenaPage - 1) * storeArena.liveArenaItemsPerPage
          }&_limit=${
            storeArena.liveArenaItemsPerPage
          }&_isDeleted_ne=true&_sort=createdAt:DESC`
        ));
        setCentredModal(false);
      
      } else {
        toast.error("Something went wrong please try again", {
          id: toastId,
        });
        setCentredModal(false);
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
                    {item.data?.eventName}
                  </MDBTypography>
                </MDBContainer>
                <div className="coreq-modal-warning d-flex align-items-center justify-content-center">
                  <div className="coreq-modal-warning-icon">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="coreq-modal-warning-label">
                    Are you certain you want to close this arena? You will not
                    be able to undo this after updating.
                  </div>
                </div>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  className="coreq-modal-approve"
                  onClick={() => processCashoutHandle("approve")}
                >
                  <MDBIcon fas icon="check" /> APPROVE
                </MDBBtn>
                <MDBBtn className="coreq-modal-deny" onClick={toggleShow}>
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
