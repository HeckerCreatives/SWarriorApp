import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";

const AgentRequestDetailsModal = ({ request }) => {
  // ** States
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => {
    setCentredModal(!centredModal);
  };

  return (
    <>
      <div className="coreq-view" role="button" onClick={toggleShow}>
        <MDBIcon fas icon="eye" className="text-white" />{" "}
        <span className="text-dark">VIEW</span>
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> REQUEST DETAILS
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer className="py-4 coreq-modal-panel">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Username:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="mb-0">{request.owner.username}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Status</p>
                    </div>
                    <div className="col-sm-9 text-capitalize">
                      <p className="mb-0">{request.status}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Amount</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="mb-0">
                        {Number(request.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Processed By</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="mb-0">Unassigned</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Payment Mode</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="mb-0">{request.details.paymentMode}</p>
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Account Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="mb-0">{request.details.bankAcctName}</p>
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Account Number</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="mb-0">{request.details.bankAcctNumber}</p>
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">
                        Account <br></br>Addtional Details
                      </p>
                    </div>
                    <div className="col-sm-9">
                      <p className="mb-0">
                        {request.details.bankAcctAddDetails}
                      </p>
                    </div>
                  </div>
                </MDBContainer>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default AgentRequestDetailsModal;
