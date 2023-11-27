import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const RealtimeControls = () => {
  return (
    <MDBCol className="gen-settings-wrapper p-2 mb-3">
      <MDBContainer fluid className="px-0 gen-settings-container">
        <MDBContainer fluid className="gen-settings-header py-3">
          <MDBIcon fas icon="wrench" />
          &nbsp;&nbsp;&nbsp;REAL-TIME CONTROLS
        </MDBContainer>
        <MDBContainer fluid className="gen-settings-body py-3 px-0">
          <div className="realtime-controls-header">
            <span>Definition</span>
            <span>Action</span>
          </div>
          <div className="realtime-controls-body">
            <span>Refresh All User's Betting Console Page.</span>
            <MDBBtn className="realtime-controls-btn shadow-0">
              <MDBIcon fas icon="sync" />
              &nbsp;&nbsp;REFRESH
            </MDBBtn>
          </div>
          <div className="realtime-controls-body">
            <span>Refresh All User's Video Player.</span>
            <MDBBtn className="realtime-controls-btn shadow-0">
              <MDBIcon fas icon="sync" />
              &nbsp;&nbsp;REFRESH
            </MDBBtn>
          </div>
          <div className="realtime-controls-body">
            <span>Refresh All Cashier's Control Panel.</span>
            <MDBBtn className="realtime-controls-btn shadow-0">
              <MDBIcon fas icon="sync" />
              &nbsp;&nbsp;REFRESH
            </MDBBtn>
          </div>
          <div className="realtime-controls-body">
            <span>Refresh All Agent / OCBS Dashboard Page.</span>
            <MDBBtn className="realtime-controls-btn shadow-0">
              <MDBIcon fas icon="sync" />
              &nbsp;&nbsp;REFRESH
            </MDBBtn>
          </div>
          <div className="realtime-controls-body">
            <span>Flash Player Username on Video Panel</span>
            <MDBBtn className="realtime-controls-btn shadow-0">
              <MDBIcon fas icon="eye" />
              &nbsp;&nbsp;DISPLAY
            </MDBBtn>
          </div>
          <div className="realtime-controls-body">
            <span>Force Logout All Users.</span>
            <MDBBtn className="realtime-controls-btn shadow-0">
              <MDBIcon fas icon="sign-out-alt" />
              &nbsp;&nbsp;LOGOUT
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default RealtimeControls;
