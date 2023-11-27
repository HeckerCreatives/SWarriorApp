import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const CredentialSecurity = () => {
  return (
    <MDBCol className="gen-settings-wrapper p-2 mb-3">
      <MDBContainer fluid className="px-0 gen-settings-container">
        <MDBContainer fluid className="gen-settings-header py-3">
          <MDBIcon fas icon="shield-alt" />
          &nbsp;&nbsp;&nbsp;CHANGE USER PASSWORD AND SECURITY CODES
        </MDBContainer>
        <MDBContainer fluid className="gen-settings-body py-3 px-0">
          <div className="credentials-security-text px-3">
            Clicking the button below will force users to change their passwords
            and create a security code. The system will then request users to
            login with their security code after they successfully updated their
            passwords.
          </div>
          <div className="px-3 mt-3">
            <MDBBtn color="warning" className="credentials-security-btn">
              <MDBIcon fas icon="key" />
              &nbsp;&nbsp;INITIATE PASSWORD CHANGE
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default CredentialSecurity;
