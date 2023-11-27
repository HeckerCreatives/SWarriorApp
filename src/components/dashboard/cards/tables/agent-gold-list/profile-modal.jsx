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

const AgentProfileModal = ({ agent }) => {
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => {
    setCentredModal(!centredModal);
  };

  return (
    <>
      <MDBBtn className="afl-btn afl-btn-1" onClick={toggleShow} role="button">
        <MDBIcon fas icon="user-tie" /> AGENT PROFILE
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              AGENT PROFILE
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
              <div className="d-flex justify-content-center mb-5">
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

              <div className="row mb-4">
                <div className="col-6">
                  <h6>
                    Points:{" "}
                    <small className="ml-2 small text-success">
                      {Number(agent.creditWallet).toFixed(2)}
                    </small>
                  </h6>
                </div>
                <div className="col-6">
                  <h6>
                    Commision:{" "}
                    <small className="ml-2 small text-success">
                      {Number(agent.commsWallet).toFixed(2)}
                    </small>
                  </h6>
                </div>
              </div>
              <hr className="hr" style={{ backgroundColor: "#fff" }} />
              <h6 className="text-muted">DETAILS</h6>
              <MDBCol size={12} lg={8} offsetLg={2}>
                <MDBContainer fluid className="p-3 variance-body">
                  <div className="variance-items">
                    <span>Mobile Number:</span>
                    <span>{agent.details.phoneNumber}</span>
                  </div>
                  <div className="variance-items">
                    <span>Referrer:</span>
                    <span>{agent.referrer}</span>
                  </div>
                  <div className="variance-items">
                    <span>Country:</span>
                    <span>{agent.details.country}</span>
                  </div>

                  {agent.details?.paymentMode ? (
                    <>
                      <h6 className="text-muted my-1">PAYMENT MODE DETAILS</h6>
                      <div className="variance-items">
                        <span>Payment Mode:</span>
                        <span>{agent.details?.paymentMode}</span>
                      </div>
                      <div className="variance-items">
                        <span>Account Name:</span>
                        <span>
                          <span>{agent.details?.bankAcctName}</span>
                        </span>
                      </div>
                      <div className="variance-items">
                        <span>Account Number:</span>
                        <span>
                          <span>{agent.details?.bankAcctNumber}</span>
                        </span>
                      </div>
                      <div className="variance-items">
                        <span>Account Addtional Details:</span>
                        <span>
                          <span>{agent.details?.bankAcctAddDetails}</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="pb-2 pt-4">
                      <h6 className="text-muted my-1">
                        No available payment method yet
                      </h6>
                    </div>
                  )}
                </MDBContainer>
              </MDBCol>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default AgentProfileModal;
