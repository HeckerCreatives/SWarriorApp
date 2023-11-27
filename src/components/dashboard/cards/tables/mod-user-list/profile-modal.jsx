import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBContainer,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
  MDBCol,
} from "mdb-react-ui-kit";
import { useState } from "react";

import a from "../../../../../assets/images/superadmin/a.png";

const PlayerProfileModal = ({ agent }) => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  return (
    <>
      <MDBBtn className="mal-btn" onClick={toggleShow} role="button">
        <img src={a} alt="btn" className="img-fluid mal-btn-img" />
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              USER PROFILE
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBIcon fas icon="user-circle" size="7x" />
              <MDBTypography tag="h1" className="mt-2 mb-1">
                {agent.username}
              </MDBTypography>
              <p className="mb-4">{agent.details.email}</p>
              <div className="d-flex justify-content-center mb-3">
                {agent.status === "approved" ? (
                  <div className="afl-status-active m-1">
                    <MDBIcon fas icon="check-circle" />
                    &nbsp;&nbsp;Active
                  </div>
                ) : (
                  <div className="afl-status-blocked m-1">
                    <MDBIcon fas icon="minus-circle" />
                    &nbsp;&nbsp;Blocked
                  </div>
                )}

                {agent.verified ? (
                  <div className="afl-verification-verified m-1">
                    <MDBIcon fas icon="check" />
                    &nbsp;&nbsp;Verified
                  </div>
                ) : (
                  <div className="afl-verification-unverified m-1">
                    <MDBIcon fas icon="times" />
                    &nbsp;&nbsp;Unverified
                  </div>
                )}
                <div className="clt-assigned m-1">
                  <MDBIcon fas icon="user-alt" /> {agent.roleName}
                </div>
              </div>

              <hr className="hr" style={{ backgroundColor: "#fff" }} />
              <h6 className="text-muted">DETAILS</h6>

              <MDBCol size={12} lg={8} className="offset-lg-2">
                <MDBContainer fluid className="p-3 variance-body">
                  <div className="variance-items">
                    <span>Mobile Number:</span>
                    <span>{agent.details.phoneNumber}</span>
                  </div>
                  <div className="variance-items">
                    <span>Referrer:</span>
                    <span>{agent.referrer}</span>
                  </div>
                </MDBContainer>
              </MDBCol>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PlayerProfileModal;
