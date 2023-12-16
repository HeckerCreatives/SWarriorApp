// ** React
import React from "react";

// ** Third Party Components
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";

// ** Modals
import EditVideoModal from "./edit-video-modal";
import TestVideoPlayerModal from "./test-player-video-modal";
import DeleteVideoModal from "./delete-video-modal";
import "./index.css";

const EmbedVideoList = ({ video }) => {
  return (
    <MDBContainer fluid className="p-3 cvitem-wrapper mb-3">
      <MDBContainer fluid className="px-0 pb-2 cvitem-btn-container text-end">
        <TestVideoPlayerModal data={video} />
        &nbsp;
        <EditVideoModal data={video} />
        &nbsp;
        <DeleteVideoModal data={video} />
      </MDBContainer>
      <MDBContainer fluid className="cvitem-item py-3">
        <MDBTypography tag="h6" className="text-white">
          {video.name}
        </MDBTypography>
        {/* <MDBContainer fluid className="px-0 mb-3">
          <MDBTypography tag="h6" className="text-white m-0">
            <small>Low Latency Code</small>
          </MDBTypography>
          <div className="cvitem-embedcode">
            <mark>Low Latency Code</mark>
          </div>
        </MDBContainer> */}
        <MDBContainer fluid className="px-0">
          <MDBTypography tag="h6" className="text-white m-0">
            <small>Compatibility Mode Code</small>
          </MDBTypography>
          <div className="cvitem-embedcode">
            <mark>{video.url}</mark>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  );
};

export default EmbedVideoList;
