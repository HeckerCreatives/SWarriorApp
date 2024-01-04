import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "./index.css";
import useCommissionHistoryStore from "../../../../../stores/commissionHistoryStore";

const CommissionsTableList = () => {
  const limit = 2;
  const [page, setPage] = useState(1);

  const getHistories = useCommissionHistoryStore(
    state => state.getCommissionHistory
  );
  const loading = useCommissionHistoryStore(state => state.loading.commissions);
  const histories = useCommissionHistoryStore(
    state => state.commission.commissions
  );
  const totalPages = useCommissionHistoryStore(
    state => state.commission.totalPages
  );
  const prevPage = useCommissionHistoryStore(
    state => state.commission.prevPage
  );
  const nextPage = useCommissionHistoryStore(
    state => state.commission.nextPage
  );

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getHistories(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getHistories(limit, prevPage);
    }
  };

  useEffect(() => {
    getHistories(limit, page);
  }, []);

  const handleDate = date =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <MDBCol className="h-100 mb-3">
      <div
        className="bg-warning text-center text-light square border-bottom   border-light border-3"
        style={{
          borderTopRightRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
        }}
      >
        Commissions History
      </div>
      <MDBRow className="mx-0 square border-bottom   border-light border-3">
        <MDBCol className="text-center text-light px-0 mx-0 ">Date</MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 ">
          Arena Name
        </MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 ">Fight #</MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 ">
          Commission Points
        </MDBCol>
      </MDBRow>
      <MDBContainer
        fluid
        className="bg-warning px-0 atl-table-container h-100"
        style={{ maxHeight: "180px" }}
      >
        <div className="table-responsive" style={{ height: "140px" }}>
          <table className="atl-table h-100">
            <tbody className="text-center">
              {loading ? (
                <tr className="text-center" style={{ maxHeight: "50px" }}>
                  <td
                    colSpan={4}
                    className="text-truncate px-0"
                    style={{ width: "180px" }}
                  >
                    <MDBSpinner size="sm" />
                  </td>
                </tr>
              ) : histories.length === 0 ? (
                <tr className="text-center" style={{ maxHeight: "50px" }}>
                  <td
                    colSpan={4}
                    className="text-truncate px-0"
                    style={{ width: "180px" }}
                  >
                    No Commission History Found
                  </td>
                </tr>
              ) : (
                histories.map(history => (
                  <tr
                    key={history._id}
                    className="text-center"
                    style={{ maxHeight: "50px" }}
                  >
                    <td
                      className="text-truncate px-0"
                      style={{ width: "180px" }}
                    >
                      {handleDate(history.createdAt)}
                    </td>
                    <td
                      className="text-truncate px-0"
                      style={{ width: "180px" }}
                    >
                      {history.arena.eventName}
                    </td>
                    <td
                      className="text-truncate px-0"
                      style={{ width: "180px" }}
                    >
                      {history.round.roundNumber}
                    </td>
                    <td
                      className="text-truncate px-0"
                      style={{ width: "180px" }}
                    >
                      {handleNumber(history.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
      </MDBContainer>
    </MDBCol>
  );
};

export default CommissionsTableList;
