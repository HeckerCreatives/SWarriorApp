// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import parse from "html-react-parser";

// ** React
import React from "react";

// ** Style
import "./index.css";

const VideoMonitoringCard = (item) => {
    console.log('this is from moniotring ccard', item)
  return (
    <MDBCol xxl={4} xl={6} lg={6} className="mb-2">
      <MDBContainer fluid className="px-0 vm-header-container">
        <MDBContainer fluid className="py-2 px-3 vm-header text-center">
          {/* <MDBIcon fas icon="play" /> */}
          &nbsp;&nbsp; {item.data.videoName}
        </MDBContainer>
        <MDBContainer fluid className="py-2 px-3 vm-sub-header text-center">
          {/* <MDBIcon fas icon="play" /> */}
       Date Uploaded : {item.data.createdAt}
        </MDBContainer>
      </MDBContainer>
      <MDBContainer fluid className="px-3 pt-4 pb-3 vm-preview-container">
        <MDBContainer fluid className="vm-preview">
          {parse(item?.data?.compatibilityModeCode || "")}
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default VideoMonitoringCard;
