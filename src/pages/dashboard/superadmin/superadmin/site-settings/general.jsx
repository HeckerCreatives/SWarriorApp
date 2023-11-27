import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";

const GeneralSettings = () => {
  return (
    <MDBCol className="gen-settings-wrapper p-2 mb-3">
      <MDBContainer fluid className="px-0 gen-settings-container">
        <MDBContainer fluid className="gen-settings-header py-3">
          <MDBIcon fas icon="cogs" />
          &nbsp;&nbsp;&nbsp;GENERAL SETTINGS
        </MDBContainer>
        <MDBContainer fluid className="gen-settings-body py-3">
          <MDBTypography tag="h6" className="mb-4">
            Application Details
          </MDBTypography>
          <div className="form-group mb-4 px-3">
            <input
              type="text"
              className="form-control gen-settings-input"
              placeholder="Website Name"
            />
          </div>
          <div className="form-group mb-4 px-3">
            <input
              type="text"
              className="form-control gen-settings-input"
              placeholder="Website URL"
            />
          </div>
          <div className="form-group mb-4 px-3">
            <input
              type="text"
              className="form-control gen-settings-input"
              placeholder="Facebook Page URL"
            />
          </div>
          <div className="px-3">
            <MDBBtn color="muted" className="shadow-0 gen-settings-btn">
              <MDBIcon fas icon="save" /> SAVE APP DETAILS
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default GeneralSettings;
