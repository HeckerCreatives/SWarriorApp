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
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import toast, { Toaster } from "react-hot-toast";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  createArena,
  liveArena,
  setLiveArenaPage,
} from "../../../../redux/slices/arena";
import { allArenaVideos } from "../../../../redux/slices/arenaVideos";

const CreateArenaModal = () => {

  //create arena confirm
  const [confirmCreateModal, setConfirmCreateModal] = useState(false);

  const toggleConfirmCreateModal = (e) => {
    e.preventDefault()
    setConfirmCreateModal(!confirmCreateModal);
  }
  // ** Vars
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => {
    if (!centredModal) {
      dispatch(allArenaVideos());
    }

    document.getElementById("myform").reset();
    setCentredModal(!centredModal);
  };

  // ** States
  const [plasadaValue, setPlasadaValue] = useState(12);
  const [plasadaDisablerMessage, setPlasadaDisablerMessage] = useState(true)
  

  // ** Store
  const storeArena = useSelector((state) => state.arena);
  const storeArenaVideos = useSelector((state) => state.arenaVideos);

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();
    setConfirmCreateModal(!confirmCreateModal);
    // toast.error(`Sorry The Commission Rate Chosen is Not allowed.`, {
    //   id: toastId,
    //   duration: 4000,
    // })
   
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

    const data = {
      arena_video_id: arenaVideo.value,
      arenaLocation: arenaLocation.value,
      eventName: arenaEventName.value,
      status: "standby",
      code: eventCode.value,
      plasadaRate: plasadaRate.value,
      tieRate: tieRate.value,
      eventType: eventType.value,
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
    }else if(plasadaRateValue <= 12){
      toast.error("Plasada rate must be greated than 12", {
        id: toastId,
      });
      return;
    }

    try {
      const response = await dispatch(createArena(data));

      if (response.type === "arenas/fulfilled") {
        toast.success(`Arena Created.`, {
          id: toastId,
        });
        document.getElementById("myform").reset();
        dispatch(
          liveArena(
            `?_start=${
              (storeArena.liveArenaPage - 1) * storeArena.liveArenaItemsPerPage
            }&_limit=${
              storeArena.liveArenaItemsPerPage
            }&_isDeleted_ne=true&_sort=createdAt:DESC`
          )
        );
        setLiveArenaPage(1);
        setCentredModal(false);
      } else {
        console.log(response);
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

  const handleChange = (event) =>{
   console.log('tstingfor event', event.target.value)
 //    const numberVal=Number(event.target.value)
     //setPlasadaValue(numberVal)
     setPlasadaValue(event.target.value)
    if(event.target.value <= 12.1){
      setPlasadaDisablerMessage(false)
    }else{
      setPlasadaDisablerMessage(true)
    }
  }
  console.log(plasadaValue)
  return (
    <>
     
      <MDBBtn
        className="live-arena-filter-btn"
        onClick={toggleShow}
        role="button"
      >
        <MDBIcon fas icon="plus" size="md" /> CREATE ARENA
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> CREATE ARENA
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
                    />
                  </div>

                  <div className="d-flex flex-wrap my-3">
                    <div className="flex-grow-1 mx-1">
                      <input
                        type="text"
                        className="form-control cua-input-text"
                        placeholder="Arena Location"
                        name="arenaLocation"
                      />
                    </div>
                    <div className="flex-grow-1 mx-1">
                      <input
                        type="text"
                        className="form-control cua-input-text"
                        placeholder="Event Code"
                        name="eventCode"
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
                      onChange={handleChange}
                      value={plasadaValue}
                    />
                  </div>
                  <p hidden={plasadaDisablerMessage} className="text-danger">Plasada Rate Must Be 12 above!</p>

                  <div className="mx-1 my-3">
                    <select
                      className="form-select  cua-input-select-2"
                      name="arenaVideo"
                      defaultValue=""
                    >
                      <option disabled hidden value="">
                        Select Arena Video
                      </option>

                      {storeArenaVideos?.allArenaVideos.map((_, i) => (
                        <option key={i} value={_.id}>
                          {_.videoName}
                        </option>
                      ))}
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
                        <option value="6">x6</option>
                        <option value="7">x7</option>
                        <option value="8">x8</option>
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
                        <option value="Live Event">Live Event</option>
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
                          id="flexSwitchCheckDisabled"
                        />
                        <label className="form-check-label text-white small">
                          Enable Draw
                        </label>
                      </div>
                    </div>
                    {/* <div className="flex-grow-1 ">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDisabled"
                        />
                        <label
                          className="form-check-label text-white small"
                          for="flexSwitchCheckDisabled"
                        >
                          Enable Draw
                        </label>
                      </div>
                    </div> */}
                  </div>

                  <div className="mx-1">
                    <MDBBtn
                      color="warning"
                      className="w-100 fw-bold"
                      role="button"

                      onClick={toggleConfirmCreateModal}
                    >
                      <MDBIcon fas icon="plus" />
                      &nbsp;&nbsp;CREATE ARENA
                    </MDBBtn>

                      {/* create arena confirm */}
                    <MDBModal tabIndex='-1' show={confirmCreateModal} setShow={setConfirmCreateModal}
              >
        <MDBModalDialog centered> 
          <MDBModalContent>
            <MDBModalHeader>
              
              <MDBModalTitle> <MDBIcon fas icon="cogs" className="pe-3"/> Confirm Create Arena?</MDBModalTitle>
              <MDBBtn type="button" className='btn-close' color='none' onClick={toggleConfirmCreateModal }></MDBBtn>
            </MDBModalHeader>
            
            <MDBModalFooter className="justify-content-center text-center pe-5">
              <MDBBtn className='pe-5 ps-5 me-4'>
                Yes
              </MDBBtn>
              <MDBBtn className='pe-5 ps-5 ms-4' onClick={toggleConfirmCreateModal }>No</MDBBtn>
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

export default CreateArenaModal;
