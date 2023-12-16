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
import useArenaStore from "../../../../stores/arenaStore";
import { errToast } from "../../../../utility/toaster";

const CreateArenaModal = () => {
  const getVideos = useArenaStore(state => state.getVideos);
  const videos = useArenaStore(state => state.videos);
  const vidLoads = useArenaStore(state => state.loading.videos);

  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  // ** States
  const [plasadaRate, setPlasadaRate] = useState(12);
  const handleChange = event => setPlasadaRate(event.target.value);

  const [isDrawEnabled, setIsDrawEnabled] = useState(false);

  const create = useArenaStore(state => state.createArena);
  const reset = useArenaStore(state => state.resetSuccess);
  const loading = useArenaStore(state => state.loading.create);
  const success = useArenaStore(state => state.success.create);

  useEffect(() => {
    if (success) {
      reset();
      document.getElementById("myform").reset();
      setIsDrawEnabled(false);
      setPlasadaRate(12);
      setCentredModal(false);
    }
  }, [success]);

  const handleSubmit = async e => {
    e.preventDefault();

    const {
      arenaEventName,
      arenaLocation,
      eventCode,
      plasadaRate,
      arenaVideo,
      tieRate,
      eventType,
    } = e.target;

    if (arenaEventName.value === "") {
      errToast("Arena event name is required");
      return;
    }

    if (arenaLocation.value === "") {
      errToast("Arena location is required");
      return;
    }

    if (eventCode.value === "") {
      errToast("Event code is required");
      return;
    }

    if (plasadaRate.value === "") {
      errToast("Plasada rate is required");
      return;
    }

    if (isNaN(plasadaRate.value)) {
      errToast("Plasada rate must be a number");
      return;
    }

    if (plasadaRate.value < 12) {
      errToast("Plasada rate must be 12 and above");
      return;
    }

    if (arenaVideo.value === "") {
      errToast("Arena video is required");
      return;
    }

    if (isDrawEnabled && tieRate.value === "") {
      errToast("Tie rate is required");
      return;
    }

    if (isDrawEnabled && isNaN(tieRate.value)) {
      errToast("Tie rate must be a number");
      return;
    }

    if (eventType.value === "") {
      errToast("Event type is required");
      return;
    }

    const arenaData = {
      arenaEventName: arenaEventName.value,
      arenaLocation: arenaLocation.value,
      eventCode: eventCode.value,
      plasadaRate: plasadaRate.value,
      arenaVideo: arenaVideo.value,
      eventType: eventType.value,
      drawEnabled: isDrawEnabled,
    };

    if (isDrawEnabled) {
      arenaData.tieRate = tieRate.value;
    }

    create(arenaData);
  };

  useEffect(() => {
    getVideos();
  }, []);

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
                      disabled={loading}
                      type="text"
                      className="form-control cua-input-text"
                      placeholder="Arena Event Name"
                      name="arenaEventName"
                    />
                  </div>

                  <div className="d-flex flex-wrap my-3">
                    <div className="flex-grow-1 mx-1">
                      <input
                        disabled={loading}
                        type="text"
                        className="form-control cua-input-text"
                        placeholder="Arena Location"
                        name="arenaLocation"
                      />
                    </div>
                    <div className="flex-grow-1 mx-1">
                      <input
                        disabled={loading}
                        type="text"
                        className="form-control cua-input-text"
                        placeholder="Event Code"
                        name="eventCode"
                      />
                    </div>
                  </div>

                  <div className="mx-1 my-3">
                    <input
                      disabled={loading}
                      type="number"
                      step="0.01"
                      className="form-control cua-input-text"
                      placeholder="Plasada Rate"
                      name="plasadaRate"
                      onChange={handleChange}
                      value={plasadaRate}
                    />
                    <p
                      hidden={plasadaRate >= 12}
                      className="text-danger fw-bold mt-0 pt-0"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Plasada rate must be 12 or above!
                    </p>
                  </div>

                  <div className="mx-1 my-3">
                    <select
                      disabled={loading}
                      className="form-select  cua-input-select-2"
                      name="arenaVideo"
                      defaultValue=""
                    >
                      {vidLoads ? (
                        <option disabled hidden value="">
                          Loading...
                        </option>
                      ) : videos.length === 0 ? (
                        <option disabled hidden value="">
                          No Video Found.
                        </option>
                      ) : (
                        <>
                          <option disabled hidden value="">
                            Select Arena Video
                          </option>
                          {videos.map(video => (
                            <option key={video._id} value={video._id}>
                              {video.name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>

                  <div className="d-flex flex-wrap my-3">
                    {isDrawEnabled && (
                      <div className="flex-grow-1 mx-1">
                        <select
                          disabled={loading}
                          className="form-select  cua-input-select-2"
                          name="tieRate"
                          defaultValue=""
                        >
                          <option disabled hidden value="">
                            Tie Rate
                          </option>
                          <option value="2">x2</option>
                          <option value="3">x3</option>
                          <option value="4">x4</option>
                          <option value="5">x5</option>
                          <option value="6">x6</option>
                          <option value="7">x7</option>
                          <option value="8">x8</option>
                        </select>
                      </div>
                    )}

                    <div className="flex-grow-1 mx-1">
                      <select
                        disabled={loading}
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
                          disabled={loading}
                          className="form-check-input"
                          name="isEnabledDraw"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDisabled"
                          value={isDrawEnabled}
                          onChange={() => setIsDrawEnabled(!isDrawEnabled)}
                        />
                        <label className="form-check-label text-white small">
                          Enable Draw
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mx-1">
                    <MDBBtn
                      disabled={loading}
                      color="warning"
                      className="w-100 fw-bold"
                    >
                      {loading ? (
                        <MDBSpinner size="sm" />
                      ) : (
                        <>
                          <MDBIcon fas icon="plus" />
                          &nbsp;&nbsp;CREATE ARENA
                        </>
                      )}
                    </MDBBtn>
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
