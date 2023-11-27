import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import "./index.css";
import useTransferStore from "../../../../../stores/transferStore";
import { useEffect, useState } from "react";
import AgentTransactionLogsTableRow from "./row";

const AgentTransactionLogsTable = () => {
  const limit = 15;
  const [page, setPage] = useState(1);

  const getHistories = useTransferStore(state => state.getAgentCreditTransfers);
  const loading = useTransferStore(state => state.loading.history);
  const histories = useTransferStore(state => state.history.histories);
  const totalPages = useTransferStore(state => state.history.totalPages);
  const prevPage = useTransferStore(state => state.history.prevPage);
  const nextPage = useTransferStore(state => state.history.nextPage);

  const success = useTransferStore(state => state.success.credit);

  useEffect(() => {
    if (success) {
      getHistories(limit, 1);
      setPage(1);
    }
  }, [success]);

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

  return (
    <MDBCol className="px-3">
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

      <MDBContainer fluid className="px-0 tlt-table-container h-100">
        <div className="table-responsive">
          <table className="tlt-table h-100">
            <thead>
              <tr className="tlt-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  ACTION
                </th>
                <th scope="col" className="text-truncate">
                  BY
                </th>
                <th scope="col" className="text-truncate">
                  SENDER
                </th>
                <th scope="col" className="text-truncate">
                  TO
                </th>
                <th scope="col" className="text-truncate">
                  RECEIVER
                </th>
                <th scope="col" className="text-truncate">
                  AMOUNT
                </th>
                <th scope="col" className="text-truncate">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    <MDBSpinner size="sm" />
                  </td>
                </tr>
              ) : histories.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    No Transactions Found.
                  </td>
                </tr>
              ) : (
                histories.map(history => (
                  <AgentTransactionLogsTableRow
                    item={history}
                    key={history._id}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentTransactionLogsTable;
