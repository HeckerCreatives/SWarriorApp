import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBContainer,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState } from "react";
import c from "../../../../../assets/images/superadmin/c.png";

const PlayerTransactionHistory = item => {
  // ** States
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => {
    setCentredModal(!centredModal);
  };

  return (
    <>
      <MDBBtn className="mal-btn" onClick={toggleShow} role="button">
        <img src={c} alt="btn" className="img-fluid mal-btn-img" />
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="xl">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              USER TRANSACTIONS
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
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
              <MDBContainer fluid className="px-0 mal-table-container h-100">
                <div className="table-responsive">
                  <table className="mal-table h-100">
                    <thead>
                      <tr className="mal-line">
                        <th scope="col" className="text-truncate">
                          UID
                        </th>
                        <th scope="col" className="text-truncate">
                          RECEIVER
                        </th>
                        <th scope="col" className="text-truncate">
                          SENDER
                        </th>
                        <th scope="col" className="text-truncate">
                          AMOUNT
                        </th>
                        <th scope="col" className="text-truncate">
                          CREDITED AT
                        </th>
                        <th scope="col" className="text-truncate">
                          CREATED AT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td className="text-truncate">
                          <div className="mal-sid">ID</div>
                        </td>
                        <td className="text-truncate">Receiver Username</td>
                        <td className="text-truncate">Sender Username</td>
                        <td className="text-truncate">Amount</td>
                        <td className="text-truncate">Credited At</td>
                        <td className="text-truncate">
                          <div className="mal-date">Date Locale String</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PlayerTransactionHistory;
