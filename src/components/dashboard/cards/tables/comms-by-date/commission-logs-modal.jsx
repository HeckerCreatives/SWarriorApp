import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBSpinner,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import useCommissionHistoryStore from "../../../../../stores/commissionHistoryStore";
import { handleDate } from "../../../../../utility/utils";

const CommsLogsModal = ({ arenaId }) => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const limit = 10;
  const [page, setPage] = useState(1);

  const getCommissions = useCommissionHistoryStore(
    state => state.getCommissionHistoryByUser
  );
  const loading = useCommissionHistoryStore(
    state => state.loading.commissionByUser
  );
  const commissions = useCommissionHistoryStore(
    state => state.commissionByUser.commissions
  );
  const totalPages = useCommissionHistoryStore(
    state => state.commissionByUser.totalPages
  );
  const prevPage = useCommissionHistoryStore(
    state => state.commissionByUser.prevPage
  );
  const nextPage = useCommissionHistoryStore(
    state => state.commissionByUser.nextPage
  );

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getCommissions(limit, nextPage, arenaId);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getCommissions(limit, prevPage, arenaId);
    }
  };

  useEffect(() => {
    if (centredModal) {
      getCommissions(limit, page, arenaId);
    }
  }, [centredModal]);

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <>
      <div className="cbd-logs" role="button" onClick={toggleShow}>
        <MDBIcon fas icon="list" />
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="xl">
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
                            Commission
                          </th>
                          <th scope="col" className="text-truncate">
                            Player
                          </th>
                          <th scope="col" className="text-truncate">
                            Agent
                          </th>
                          <th scope="col" className="text-truncate">
                            Outcome
                          </th>
                          <th scope="col" className="text-truncate text-center">
                            Created At
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan={7}>
                              <MDBSpinner size="sm" />
                            </td>
                          </tr>
                        ) : commissions.length === 0 ? (
                          <tr>
                            <td colSpan={7}>No Commission Found</td>
                          </tr>
                        ) : (
                          commissions.map(commission => (
                            <tr key={commission._id}>
                              <td>{commission.arena}</td>
                              <td>{commission.fights}</td>
                              <td>{handleNumber(commission.commission)}</td>
                              <td>{commission.player}</td>
                              <td>{commission.agent}</td>
                              <td className="text-capitalize">
                                {commission.outcome}
                              </td>
                              <td>{handleDate(commission.createdAt)}</td>
                            </tr>
                          ))
                        )}
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

export default CommsLogsModal;
