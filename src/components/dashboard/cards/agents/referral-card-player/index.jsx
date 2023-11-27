// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Component
import CopyToClipboardButton from "../copy-to-clipboard-button";
import { userInfo } from "../../../../../utility/UserInfo";

const AgentReferralCard = () => {
  const auth = "";

  return (
    <MDBCol className="arg-wrapper">
      <MDBContainer fluid className="px-0 mt-3 arg-container">
        <MDBContainer fluid className="px-0 arg-body">
          <MDBContainer fluid className="py-3">
            <MDBRow className="mx-0">
              <MDBCol xxl={2} xl={3} lg={4} md={5} className="mb-3">
                <span className="arg-body-title">
                  <MDBIcon fas icon="user-friends" />
                  &nbsp;&nbsp;REFERRAL LINK TO PLAYER
                </span>
              </MDBCol>
              <MDBCol xxl={10} xl={9} lg={8} md={7}>
                <MDBContainer className="arg-body-link mb-3 py-2 text-truncate">
                  {`${window.location.origin}/registration/${
                    userInfo().userId
                  }/${window.btoa("player")}`}
                </MDBContainer>
                <MDBContainer className="text-center">
                  <CopyToClipboardButton
                    text={`${window.location.origin}/registration/${
                      userInfo().userId
                    }/${window.btoa("player")}`}
                    successText="Text copied!"
                    buttonText="COPY LINK"
                  />
                </MDBContainer>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentReferralCard;
