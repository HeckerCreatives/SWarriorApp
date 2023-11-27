import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBContainer,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useState } from "react";
import useTransferStore from "../../../../../stores/transferStore";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";
import c from "../../../../../assets/images/superadmin/c.png";

const PlayerTransactionHistory = ({ agentId }) => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const limit = 10;
  const [page, setPage] = useState(1);

  const getHistories = useTransferStore(state => state.getTransfersById);
  const loading = useTransferStore(state => state.loading.history);
  const histories = useTransferStore(state => state.history.histories);
  const totalPages = useTransferStore(state => state.history.totalPages);
  const prevPage = useTransferStore(state => state.history.prevPage);
  const nextPage = useTransferStore(state => state.history.nextPage);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getHistories(agentId, limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getHistories(agentId, limit, prevPage);
    }
  };

  useEffect(() => {
    if (centredModal) {
      getHistories(agentId, limit, page);
    }
  }, [centredModal]);

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
                <button
                  onClick={handlePrevPage}
                  disabled={prevPage === null || loading}
                  className="tp-pager"
                  role="button"
                >
                  <MDBIcon fas icon="angle-double-left" />
                </button>
                <div className="tp-page">
                  {page} / {totalPages}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={nextPage === null || loading}
                  className="tp-pager"
                  role="button"
                >
                  <MDBIcon fas icon="angle-double-right" />
                </button>
              </MDBContainer>
              <MDBContainer fluid className="px-0 mal-table-container h-100">
                <div className="table-responsive">
                  <table className="mal-table h-100">
                    <thead>
                      <tr className="mal-line">
                        <th scope="col" className="text-truncate">
                          TID
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
                          CREATED AT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="text-center">
                            <MDBSpinner size="sm" />
                          </td>
                        </tr>
                      ) : histories.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center">
                            No Transactions Found.
                          </td>
                        </tr>
                      ) : (
                        histories.map(history => (
                          <tr key={history._id} className="text-center">
                            <td className="text-truncate">
                              <div className="mal-sid">
                                {handleCharLimit(history._id)}
                              </div>
                            </td>
                            <td className="text-truncate">
                              {history.receiver.username}
                            </td>
                            <td className="text-truncate">
                              {history.sender.username}
                            </td>
                            <td className="text-truncate">{history.amount}</td>
                            <td className="text-truncate">
                              <div className="mal-date">
                                {handleDate(history.createdAt)}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
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
