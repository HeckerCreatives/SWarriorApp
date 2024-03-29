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
import { useState } from "react";

const ArenaLogsModal = () => {
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  return (
    <>
      <div className="ca-btn-logs" onClick={toggleShow} role="button">
        <MDBIcon fas icon="list" />
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="ca-modal-body py-2 ">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 ca-modal-title"
            >
              <MDBIcon fas icon="warehouse" /> ARENA HISTORY
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="ca-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer
                fluid
                className="px-0 mb-3 d-flex align-items-center justify-content-center"
              >
                <button className="tc-pager" role="button">
                  <MDBIcon fas icon="angle-double-left" />
                </button>
                <div className="tc-page">{1}</div>
                <button className="tc-pager" role="button">
                  <MDBIcon fas icon="angle-double-right" />
                </button>
              </MDBContainer>
              <MDBContainer
                fluid
                className="px-0 position-relative text-center"
              >
                <MDBContainer className="ca-modal-panel py-2">
                  <div className="table-responsive">
                    <table className="closed-arena-table h-100">
                      <thead>
                        <tr className="closed-arena-line">
                          <th scope="col" className="text-truncate">
                            Arena
                          </th>
                          <th scope="col" className="text-truncate">
                            Fight No.
                          </th>
                          <th scope="col" className="text-truncate">
                            Outcome
                          </th>
                          <th scope="col" className="text-truncate text-center">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
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

export default ArenaLogsModal;
