// ** React
import React, { useState } from "react";

// ** Third Party Components
import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import toast, { Toaster } from "react-hot-toast";

// ** Style
import "./index.css";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  createArenaVideo,
  allArenaVideosCount,
  allArenaVideos,
} from "../../../../../redux/slices/arenaVideos";

const CreateVideoForm = () => {
  //use State
  const [videoURL, setVideoURL] = useState('')
  // ** Vars
  const dispatch = useDispatch();

  // ** Store
  const storeArenaVideos = useSelector((state) => state.arenaVideos);

  const handleTextareaChange = (event) => {
    setVideoURL(event.target.value)
  }

  const handleSubmit = async (e) => {
   
    const toastId = toast.loading("Loading...");
    e.preventDefault();
    console.log(e);

    const { videoName, lowLatencyCode, compatibilityCode } = e.target;
   
    const data = {
      videoName: videoName.value,
      // lowLatencyCode: lowLatencyCode.value,
      // compatibilityModeCode: compatibilityCode.value,
      compatibilityModeCode: `<iframe width="560" height="315" src="${videoURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    //  compatibilityModeCode: `<iframe width="560" height="315" src="${videoURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    };

    try {
      const response = await dispatch(createArenaVideo(data));

      if (data.videoName === ""){
        toast.error(`Please input a video name`, {
          id: toastId,
        });
      }
      // else if (data.lowLatencyCode === ""){
      //   toast.error(`Please input a low latency code or embed code`, {
      //     id: toastId,
      //   });
      // }
      else if (data.compatibilityCode === ""){
        toast.error(`Please input a compatibility code or embed code`, {
          id: toastId,
        });
      }
      else{
        if (response.type === "arenaVideos/fulfilled") {
          toast.success(`Video Created.`, {
            id: toastId,
          });
          await dispatch(allArenaVideosCount());
          await dispatch(
            allArenaVideos(
              `?_start=${
                (storeArenaVideos.currentPage - 1) * storeArenaVideos.itemsPerPage
              }&_limit=${storeArenaVideos.itemsPerPage}`
            )
          );
          await document.getElementById("myform").reset();
        }
        if (response.payload.status === 400) {
          toast.error(response.payload.message, {
            id: toastId,
          });
        } else {
          // toast.error("Something went wrong please try again", {
          //   id: toastId,
          // });
        }
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong please try again", {
      //   id: toastId,
      // });
    }
  };
  return (
    <MDBCol xxl={4} xl={4} lg={5} className="mb-3">
      <Toaster />
      <MDBContainer fluid className="p-3 cvform-container">
        <form onSubmit={handleSubmit} id="myform" autoComplete="off">
          <div className="mb-3">
            <input
              type="text"
              className="form-control cvform-input"
              id=""
              placeholder="Enter Video Name"
              name="videoName"
            />
          </div>
          {/* <div className="mb-3">
            <textarea
              className="form-control cvform-input"
              id=""
              // placeholder="Low Latency (WEB RTC) Embed Code"
              placeholder="Enter Video URL"
              name="lowLatencyCode"
              rows="5"
              // defaultValue="Default text goes here"
            ></textarea>
          </div> */}
          <div className="mb-3">
            <textarea
              className="form-control cvform-input"
              id=""
              // placeholder="Compatibility (HLS) Embed Code"
               placeholder="Enter Video URL"
              name="compatibilityCode"
              rows="5"
              value={videoURL}
              onChange={handleTextareaChange}
            />
          </div>
          <MDBBtn className="cvform-submit-btn" role="button">
            <MDBIcon fas icon="plus" /> ADD VIDEO
          </MDBBtn>
        </form>
      </MDBContainer>
    </MDBCol>
  );
};

export default CreateVideoForm;
