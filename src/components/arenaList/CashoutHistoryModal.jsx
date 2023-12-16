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

const CashoutHistoryModal = () => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  return (
    <>
      <MDBIcon
        fas
        icon="cash-register"
        size="xl"
        role="button"
        onClick={toggleShow}
      />

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="xl">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> Cashout Logs
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
              <MDBContainer fluid className="px-0 clt-table-container h-100">
                <div className="table-responsive">
                  <table className="clt-table h-100">
                    <thead>
                      <tr className="clt-line">
                        <th scope="col" className="text-truncate">
                          ID
                        </th>
                        <th scope="col" className="text-truncate">
                          USERNAME
                        </th>
                        <th scope="col" className="text-truncate">
                          ASSIGNED TO
                        </th>
                        <th scope="col" className="text-truncate">
                          AMOUNT
                        </th>
                        <th scope="col" className="text-truncate">
                          LOG
                        </th>
                        <th scope="col" className="text-truncate">
                          DATE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td className="text-truncate"></td>
                        <td className="text-truncate text-info"></td>
                        <td className="text-truncate">
                          <div className="clt-assigned">
                            <MDBIcon fas icon="user-alt" />
                          </div>
                        </td>
                        <td className="text-truncate text-primary"></td>
                        <td className={`text-truncate`}>
                          <small></small>
                        </td>
                        <td className="text-truncate">
                          <div className="clt-date"></div>
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

export default CashoutHistoryModal;
