// ** React
import React, { useEffect } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { errToast } from "../../../../../utility/toaster";
import useVideoStore from "../../../../../stores/videoStore";

const CreateVideoForm = () => {
  const create = useVideoStore(state => state.createVideo);
  const reset = useVideoStore(state => state.resetSuccess);
  const loading = useVideoStore(state => state.loading.create);
  const success = useVideoStore(state => state.success.create);

  useEffect(() => {
    if (success) {
      reset();
      document.getElementById("myform").reset();
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

    create({
      name: videoName.value,
      url: videoUrl.value,
    });
  };

  return (
    <MDBCol xxl={4} xl={4} lg={5} className="mb-3">
      <Toaster />
      <MDBContainer fluid className="p-3 cvform-container">
        <form onSubmit={handleSubmit} id="myform" autoComplete="off">
          <div className="mb-3">
            <input
              disabled={loading}
              type="text"
              className="form-control cvform-input"
              id=""
              placeholder="Enter Video Name"
              name="videoName"
            />
          </div>

          <div className="mb-3">
            <textarea
              disabled={loading}
              className="form-control cvform-input"
              id=""
              placeholder="Enter Video URL"
              name="videoUrl"
              rows="5"
            />
          </div>
          <MDBBtn
            disabled={loading}
            className="cvform-submit-btn"
            role="button"
          >
            {loading ? (
              <MDBSpinner size="sm" />
            ) : (
              <>
                <MDBIcon fas icon="plus" /> ADD VIDEO
              </>
            )}
          </MDBBtn>
        </form>
      </MDBContainer>
    </MDBCol>
  );
};

export default CreateVideoForm;
