// ** React
import { useState, useEffect } from "react";

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
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  updateArena,
  liveArena,
  setLiveArenaPage,
} from "../../../../../redux/slices/arena";
import { allArenaVideos } from "../../../../../redux/slices/arenaVideos";

const EditArenaModal = ({ data }) => {
  //confirm edit arena modal
  const [confirmEditArenaModal, setConfirmEditArenaModal] = useState(false);
   // toggle modal confirm pop up
   const toggleConfirmEditArena = (e) => {
    e.preventDefault()
    setConfirmEditArenaModal(!confirmEditArenaModal);
  }

  // ** Vars
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => {
    if (data.length === 0) {
      toast.error("Please Select Arena To Be Edited", {
        duration: 3000,
      });
    } else {
      if (!centredModal) {
        dispatch(allArenaVideos());
      }
      setCentredModal(!centredModal);
    }
  };

  // ** Options

  const tieRateOptions = [
    { value: "6", label: "x6" },
    { value: "7", label: "x7" },
    { value: "8", label: "x8" },
  ];

  // ** Store
  const storeArena = useSelector((state) => state.arena);
  const storeArenaVideos = useSelector((state) => state.arenaVideos);

  const eventTypeOptions = [{ value: "Live Event", label: "Live Event" }];

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();
    //closes the confirm arena modal on submit
    setConfirmEditArenaModal(!confirmEditArenaModal);

    const {
      arenaVideo,
      arenaLocation,
      arenaEventName,
      eventCode,
      plasadaRate,
      tieRate,
      eventType,
      isEnabledDraw,
    } = e.target;

    const dataToInsert = {
      id: data.id,
      arena_video_id: arenaVideo.value,
      arenaLocation: arenaLocation.value || "",
      eventName: arenaEventName.value || "",
      code: eventCode.value || "",
      plasadaRate: plasadaRate.value || "",
      tieRate: tieRate.value || "",
      eventType: eventType.value || "",
      isEnabledDraw: isEnabledDraw.checked,
    };

    // Check if required fields are filled out
    if (
      !arenaVideo.value ||
      !arenaLocation.value ||
      !arenaEventName.value ||
      !eventCode.value ||
      !plasadaRate.value ||
      !tieRate.value ||
      !eventType.value
    ) {
      toast.error("Please fill out all required fields", {
        id: toastId,
      });
      return;
    }

    // Check if input values are in correct format
    const plasadaRateValue = parseFloat(plasadaRate.value);
    const tieRateValue = parseFloat(tieRate.value);

    if (isNaN(plasadaRateValue) || isNaN(tieRateValue)) {
      toast.error("Please enter a valid rate", {
        id: toastId,
      });
      return;
    }

    try {
      const response = await dispatch(updateArena(dataToInsert));

      if (response.type === "arenas/fulfilled") {
        toast.success(`Arena Updated.`, {
          id: toastId,
        });
        document.getElementById("myform").reset();
        window.location.reload();
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
      <MDBBtn
        className="live-arena-controls la-btn-3 me-2 mb-2"
        onClick={toggleShow}
        role="button"
      >
        <MDBIcon fas icon="edit" /> EDIT
      </MDBBtn>

      <MDBModal
        id="myform"
        tabIndex="-1"
        show={centredModal}
        setShow={setCentredModal}
      >
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> UPDATE ARENA
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
                <form id="myform" onSubmit={handleSubmit} autoComplete="off">
                  <div className="mx-1 my-3">
                    <input
                      type="text"
                      className="form-control cua-input-text"
                      placeholder="Arena Event Name"
                      name="arenaEventName"
                      defaultValue={data.eventName}
                    />
                  </div>

                  <div className="d-flex flex-wrap my-3">
                    <div className="flex-grow-1 mx-1">
                      <input
                        type="text"
                        className="form-control cua-input-text"
                        placeholder="Arena Location"
                        name="arenaLocation"
                        defaultValue={data.arenaLocation}
                      />
                    </div>
                    <div className="flex-grow-1 mx-1">
                      <input
                        type="text"
                        className="form-control cua-input-text"
                        placeholder="Event Code"
                        name="eventCode"
                        defaultValue={data.code}
                      />
                    </div>
                  </div>

                  <div className="mx-1 my-3">
                    <input
                      type="number"
                      step="0.01"
                      className="form-control cua-input-text"
                      placeholder="Plasada Rate"
                      name="plasadaRate"
                      defaultValue={data.plasadaRate}
                    />
                  </div>

                  <div className="mx-1 my-3">
                    <select
                      className="form-select  cua-input-select-2"
                      name="arenaVideo"
                      defaultValue=""
                    >
                      <option disabled hidden value="">
                        Select Arena Video
                      </option>

                      {storeArenaVideos?.allArenaVideos.map((_, i) =>
                        data.arena_video_id?.id === _.id ? (
                          <option key={i} value={_.id} selected>
                            {_.videoName}
                          </option>
                        ) : (
                          <option key={i} value={_.id}>
                            {_.videoName}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="d-flex flex-wrap my-3">
                    <div className="flex-grow-1 mx-1">
                      <select
                        className="form-select  cua-input-select-2"
                        name="tieRate"
                        defaultValue=""
                      >
                        <option disabled hidden value="">
                          Tie Rate
                        </option>

                        {tieRateOptions.map((_, i) =>
                          Number(data.tieRate) === Number(_.value) ? (
                            <option key={i} value={_.value} selected>
                              {_.label}
                            </option>
                          ) : (
                            <option key={i} value={_.value}>
                              {_.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="flex-grow-1 mx-1">
                      <select
                        className="form-select cua-input-select-2"
                        name="eventType"
                        defaultValue=""
                      >
                        <option disabled hidden value="">
                          Event Type
                        </option>

                        {eventTypeOptions.map((_, i) =>
                          data.eventType === _.value ? (
                            <option key={i} value={_.value} selected>
                              {_.label}
                            </option>
                          ) : (
                            <option key={i} value={_.value}>
                              {_.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap mx-1 my-3">
                    <div className="flex-grow-1 ">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          name="isEnabledDraw"
                          type="checkbox"
                          role="switch"
                          defaultChecked={data.isEnabledDraw}
                          id="flexSwitchCheckDisabled"
                        />
                        <label className="form-check-label text-white small">
                          Enable Draw
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mx-1">
                    <MDBBtn
                      color="warning"
                      className="w-100 fw-bold"
                      role="button"
                      onClick={toggleConfirmEditArena}
                    >
                      <MDBIcon fas icon="plus" />
                      &nbsp;&nbsp;EDIT ARENA
                    </MDBBtn>

                    {/* cofirmation modal */}

              <MDBModal tabIndex='-1' show={confirmEditArenaModal} setShow={setConfirmEditArenaModal}
              >
        <MDBModalDialog centered> 
          <MDBModalContent>
            <MDBModalHeader>
              
              <MDBModalTitle> <MDBIcon fas icon="cogs" className="pe-3"/> Confirm Edit Arena?</MDBModalTitle>
              <MDBBtn type="button" className='btn-close' color='none' onClick={toggleConfirmEditArena}></MDBBtn>
            </MDBModalHeader>
            
            <MDBModalFooter className="justify-content-center text-center pe-5">
              <MDBBtn className='pe-5 ps-5 me-4'>
                Yes
              </MDBBtn>
              <MDBBtn className='pe-5 ps-5 ms-4' onClick={toggleConfirmEditArena}>No</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
                  </div>
                </form>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditArenaModal;
