import { MDBCol, MDBContainer, MDBRow, MDBIcon } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "./index.css";
import useTransferStore from "../../../../../stores/transferStore";

const AmountTableList = () => {
  const limit = 2;
  const [page, setPage] = useState(1);

  const getHistories = useTransferStore(state => state.getAgentCreditTransfers);
  const loading = useTransferStore(state => state.loading.history);
  const histories = useTransferStore(state => state.history.histories);
  const totalPages = useTransferStore(state => state.history.totalPages);
  const prevPage = useTransferStore(state => state.history.prevPage);
  const nextPage = useTransferStore(state => state.history.nextPage);

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

  return (
    <MDBCol className="h-100 mb-3">
      <div
        className="bg-warning text-center text-light text-light square border-bottom   border-light border-3"
        style={{
          borderTopRightRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
        }}
      >
        Transfer Commission History
      </div>
      <MDBRow className="mx-0 square border-bottom   border-light border-3">
        <MDBCol className="text-center text-light px-0 mx-0 ">Amount</MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 ">Date</MDBCol>
      </MDBRow>
      <MDBContainer
        fluid
        className="px-0 bg-warning atl-table-container h-100"
        style={{ maxHeight: "180px" }}
      >
        <div className="table-responsive" style={{ height: "140px" }}>
          <table className="atl-table h-100">
            <tbody className="text-center">
              {loading ? (
                ""
              ) : histories.length === 0 ? (
                <tr className="text-center">
                  <td
                    className="text-truncate px-0 py-0"
                    style={{ width: "180px", height: "10px" }}
                  >
                    Amount
                  </td>
                  <td
                    className="text-truncate px-0 py-0"
                    style={{ width: "180px" }}
                  >
                    Date Locale String
                  </td>
                </tr>
              ) : (
                histories.map(history => (
                  <tr className="text-center">
                    <td
                      className="text-truncate px-0 py-0"
                      style={{ width: "180px", height: "10px" }}
                    >
                      {Number(history.amount).toFixed(2)}
                    </td>
                    <td
                      className="text-truncate px-0 py-0"
                      style={{ width: "180px" }}
                    >
                      {handleDate(history.createdAt)}
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

export default AmountTableList;
