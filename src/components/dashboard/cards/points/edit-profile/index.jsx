import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const AgentEditProfile = () => {
  return (
    <MDBCol xxl={6} xl={8} lg={8} md={10} sm={11} className="aep-wrapper p-2">
      <MDBContainer fluid className="p-0 aep-container">
        <MDBContainer fluid className="px-3 pt-3 aep-header">
          <div className="aep-title">
            <MDBIcon fas icon="user-cog" />
            &nbsp;&nbsp;EDIT PROFILE
          </div>
        </MDBContainer>
        <MDBContainer fluid className="px-0 py-3 aep-body">
          <div className="aep-form-panel-container">
            <div className="aep-form-panel-title">Basic Information</div>
            <div className="px-3 mb-4">
              <MDBInput
                label={<span className="text-white">Full Name</span>}
                className="aep-input-text"
                id="form1"
                type="text"
              />
            </div>
          </div>

          <div className="aep-form-panel-container">
            <div className="aep-form-panel-title">Contact Information</div>
            <div className="mx-3 mb-4 position-relative">
              <MDBIcon far icon="envelope" className="aep-input-icon" />
              <MDBInput
                label={<span className="text-white">Email Address</span>}
                className="aep-input"
                id="form1"
                type="text"
              />
            </div>
            <div className="mx-3 mb-4 position-relative">
              <MDBIcon fas icon="phone" className="aep-input-icon" />
              <MDBInput
                label={<span className="text-white">Contact Number</span>}
                className="aep-input"
                id="form1"
                type="text"
              />
            </div>
            <div className="mx-3 mb-4 position-relative">
              <MDBIcon fas icon="code" className="aep-input-icon" />
              <MDBInput
                label={<span className="text-white">Agent Referral Code</span>}
                className="aep-input"
                id="form1"
                type="text"
              />
            </div>
          </div>

          <div className="aep-form-panel-container">
            <div className="aep-form-panel-title">Change Password</div>
            <div className="px-3 mb-4">
              <MDBInput
                label={<span className="text-white">Change Password</span>}
                className="aep-input"
                id="form1"
                type="password"
              />
              <span className="aep-form-panel-note">
                Leave blank if you don't want to change your password.
              </span>
            </div>
          </div>

          <div className="aep-form-panel-container-last">
            <div className="aep-form-panel-title">Change Security Code</div>
            <div className="px-3 mb-4">
              <MDBInput
                label={
                  <span className="text-white">4-Digit Security Code</span>
                }
                className="aep-input"
                id="form1"
                type="text"
              />
              <div className="aep-form-panel-note text-end">0/4</div>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between px-3">
            <MDBBtn color="warning" className="fw-bold w-100">
              <MDBIcon far icon="save" />
              &nbsp;&nbsp;SAVE PAYMENT MODE
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentEditProfile;
