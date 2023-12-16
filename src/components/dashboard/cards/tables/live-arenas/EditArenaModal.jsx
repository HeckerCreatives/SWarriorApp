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
  MDBSpinner,
  MDBTypography,
} from "mdb-react-ui-kit";
import useArenaStore from "../../../../../stores/arenaStore";
import { errToast } from "../../../../../utility/toaster";

const EditArenaModal = ({ data }) => {
  const [centredModal, setCentredModal] = useState(false);
  const [isDrawEnabled, setIsDrawEnabled] = useState(data.drawEnabled);

  const [plasadaRate, setPlasadaRate] = useState(data.plasadaRate);
  const handleChange = event => setPlasadaRate(event.target.value);

  const toggleShow = () => setCentredModal(!centredModal);

  const videos = useArenaStore(state => state.videos);
  const vidLoads = useArenaStore(state => state.loading.videos);

  const update = useArenaStore(state => state.updateArena);
  const reset = useArenaStore(state => state.resetSuccess);
  const loading = useArenaStore(state => state.loading.update);
  const success = useArenaStore(state => state.success.update);

  useEffect(() => {
    if (success) {
      reset();
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
      arenaId: data._id,
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

    update(arenaData);
  };

  const tieRates = [
    { label: "2x", value: 2 },
    { label: "3x", value: 3 },
    { label: "4x", value: 4 },
    { label: "5x", value: 5 },
    { label: "6x", value: 6 },
    { label: "7x", value: 7 },
    { label: "8x", value: 8 },
  ];

  return (
    <>
      <MDBIcon
        className="text-secondary shadow-sm la-icon-btn"
        onClick={toggleShow}
        role="button"
        fas
        icon="edit"
        size="xl"
      />

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
                      disabled={loading}
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
                        disabled={loading}
                        type="text"
                        className="form-control cua-input-text"
                        placeholder="Arena Location"
                        name="arenaLocation"
                        defaultValue={data.location}
                      />
                    </div>
                    <div className="flex-grow-1 mx-1">
                      <input
                        disabled={loading}
                        type="text"
                        className="form-control cua-input-text"
                        placeholder="Event Code"
                        name="eventCode"
                        defaultValue={data.eventCode}
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
                      className="text-danger fw-bold mt-0 pt-0 text-start"
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
                      defaultValue={data.arenaVideo.videoId}
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
                          <option value={data.arenaVideo.videoId}>
                            {data.arenaVideo.name}
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
                          className="form-select cua-input-select-2"
                          name="tieRate"
                          defaultValue={data.tieRate}
                        >
                          <option disabled hidden value="">
                            Tie Rate
                          </option>
                          {tieRates.map((tr, i) => (
                            <option value={tr.value} key={`tr-${i}`}>
                              {tr.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="flex-grow-1 mx-1">
                      <select
                        disabled={loading}
                        className="form-select cua-input-select-2"
                        name="eventType"
                        defaultValue={data.evenType}
                      >
                        <option disabled hidden value="">
                          Event Type
                        </option>
                        <option value="Live Event">Live Event</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap mx-1 my-3">
                    <div className="">
                      <div className="form-check form-switch">
                        <input
                          disabled={loading}
                          className="form-check-input"
                          name="isEnabledDraw"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDisabled"
                          checked={isDrawEnabled}
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
                          <MDBIcon fas icon="edit" />
                          &nbsp;&nbsp;UPDATE ARENA
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

export default EditArenaModal;
