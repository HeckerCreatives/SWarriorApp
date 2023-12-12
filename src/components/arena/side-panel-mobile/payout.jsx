// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import toast from "react-hot-toast";
import {
  MDBModalContent,
  MDBModalBody,
  MDBBtn,
  MDBModalDialog,
  MDBModal,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

// ** Components
import AnimatedNumber from "../components/AnimatedNumber";

const SidePanelPayoutMobile = ({ data }) => {
  const [centredModal, setCentredModal] = useState(false);

  return (
    <MDBCol>
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="sm">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBModalBody>
              <p className="text-white text-center mb-4">
                Are you sure to place your bet on meron?
              </p>
              <div className="d-flex justify-content-center">
                <MDBBtn
                  color="secondary"
                  className="mx-3"
                  size="sm"
                  onClick={() => setCentredModal(false)}
                >
                  Cancel
                </MDBBtn>
                <MDBBtn size="sm" color="danger">
                  Place Bet Wala
                </MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBContainer fluid className="p-3 sppayout-container position-relative">
        <MDBRow>
          <MDBCol size={6} sm={6} md={12} className="p-0 px-2">
            <MDBContainer fluid className="p-0">
              <MDBContainer
                fluid
                role="button"
                className={`px-0 py-1 sppayout-btn sppayout-btn-meron`}
              >
                <MDBTypography tag="h4" className="text-center m-0">
                  MERON
                </MDBTypography>
              </MDBContainer>
              <MDBContainer fluid className="p-0 sppayout-btn-content">
                <MDBRow className="d-flex align-items-center flex-column">
                  <MDBCol>
                    <h6
                      style={{ color: "#d6ff17", fontWeight: "bolder" }}
                      className="my-1 text-center"
                    >
                      <AnimatedNumber value={0} />
                    </h6>
                  </MDBCol>
                  <MDBCol>
                    <div className="sppayout-bets  text-center">
                      <span className="text-white fw-bolder">
                        PAYOUT: <AnimatedNumber value={0} />
                      </span>
                    </div>
                  </MDBCol>
                  <MDBCol center className="text-center">
                    <button
                      className="spbets-btn-container p-2 my-2"
                      role="button"
                      disabled={false}
                    >
                      <div className="spbets-btn-meron">
                        <MDBTypography tag="h4" className="m-0">
                          "BET MERON"
                        </MDBTypography>
                      </div>
                    </button>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBContainer>
          </MDBCol>
          <MDBCol size={6} sm={6} md={12} className="p-0 px-2">
            <MDBContainer fluid className="p-0">
              <MDBContainer
                fluid
                role="button"
                className="px-0 py-1 sppayout-btn sppayout-btn-wala"
              >
                <MDBTypography tag="h4" className="text-center m-0">
                  WALA
                </MDBTypography>
              </MDBContainer>

              <MDBContainer fluid className="p-0 sppayout-btn-content">
                <MDBRow className="d-flex align-items-center flex-column">
                  <MDBCol className="p-0">
                    <h6
                      style={{ color: "#d6ff17", fontWeight: "bolder" }}
                      className="my-1 text-center"
                    >
                      <AnimatedNumber value={0} />
                    </h6>
                  </MDBCol>
                  <MDBCol>
                    <div className={`sppayout-bets text-center`}>
                      <span className="text-white fw-bolder">
                        PAYOUT: <AnimatedNumber value={0} />
                      </span>
                    </div>
                  </MDBCol>
                  <MDBCol center className="text-center">
                    <button
                      className="spbets-btn-container p-2 my-2"
                      role="button"
                      disabled={false}
                    >
                      <div className="spbets-btn-wala">
                        <MDBTypography tag="h4" className="m-0">
                          "BET WALA"
                        </MDBTypography>
                      </div>
                    </button>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelPayoutMobile;
