import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";

const ViewProfileModal = ({ data }) => {
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  return (
    <>
      <div className="tp-action" role="button" onClick={toggleShow}>
        VIEW PROFILE
      </div>

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
                {data.username}
              </MDBTypography>
              <p className="mb-4">{data.details.email}</p>
              <div className="d-flex justify-content-center mb-5">
                {data.status === "approved" && (
                  <div className="afl-status-active m-1">
                    <MDBIcon fas icon="check-circle" />
                    &nbsp;&nbsp;Active
                  </div>
                )}

                {data.status === "blocked" && (
                  <div className="afl-status-blocked m-1">
                    <MDBIcon fas icon="minus-circle" />
                    &nbsp;&nbsp;Blocked
                  </div>
                )}

                {/* <div className="afl-verification-verified m-1">
                  <MDBIcon fas icon="check" />
                  &nbsp;&nbsp;Verified
                </div>

                <div className="afl-verification-unverified m-1">
                  <MDBIcon fas icon="times" />
                  &nbsp;&nbsp;Unverified
                </div> */}

                <div className="clt-assigned m-1">
                  <MDBIcon fas icon="user-alt" /> {data.roleName}
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <h6>
                    Points:{" "}
                    <small className="ml-2 small text-success">
                      {Number(data.creditWallet).toFixed(2)}
                    </small>
                  </h6>
                </div>
                {data.roleName !== "Player" && (
                  <div className="col-6">
                    <h6>
                      Commision:{" "}
                      <small className="ml-2 small text-success">
                        {Number(data.commsWallet).toFixed(2)}
                      </small>
                    </h6>
                  </div>
                )}
              </div>
              <hr className="hr" style={{ backgroundColor: "#fff" }} />
              <h6 className="text-muted">DETAILS</h6>
              <MDBCol size={12} lg={8} className="offset-lg-2">
                <MDBContainer fluid className="p-3 variance-body">
                  <div className="variance-items">
                    <span>Mobile Number:</span>
                    <span>{data.details.phoneNumber}</span>
                  </div>
                  <div className="variance-items">
                    <span>Referrer:</span>
                    <span>{data.referrer}</span>
                  </div>
                  <div className="variance-items">
                    <span>Country:</span>
                    <span>{data.details.country}</span>
                  </div>

                  {data.details?.paymentMode ? (
                    <>
                      <h6 className="text-muted my-1">PAYMENT MODE DETAILS</h6>
                      <div className="variance-items">
                        <span>Payment Mode:</span>
                        <span>{data.details?.paymentMode}</span>
                      </div>
                      <div className="variance-items">
                        <span>Account Name:</span>
                        <span>
                          <span>{data.details?.bankAcctName}</span>
                        </span>
                      </div>
                      <div className="variance-items">
                        <span>Account Number:</span>
                        <span>
                          <span>{data.details?.bankAcctNumber}</span>
                        </span>
                      </div>
                      <div className="variance-items">
                        <span>Account Addtional Details:</span>
                        <span>
                          <span>{data.details?.bankAcctAddDetails}</span>
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

export default ViewProfileModal;
