// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";

// ** React
import { useEffect, useState } from "react";

// ** Style
import "./index.css";

// ** Components
import CommsWithdrawalLogsTableRow from "./row";
import useLogStore from "../../../../../stores/logStore";

const CommsWithdrawalLogsTable = () => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const getLogs = useLogStore(state => state.getCommissionLogs);
  const logs = useLogStore(state => state.commission.logs);
  const totalPages = useLogStore(state => state.commission.totalPages);
  const nextPage = useLogStore(state => state.commission.nextPage);
  const prevPage = useLogStore(state => state.commission.prevPage);
  const loading = useLogStore(state => state.loading.commission);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getLogs(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getLogs(limit, prevPage);
    }
  };

  useEffect(() => {
    getLogs(limit, page);
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
      <MDBContainer fluid className="px-0 cwlt-table-container h-100">
        <div className="table-responsive">
          <table className="cwlt-table h-100">
            <thead>
              <tr className="cwlt-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                {/* <th scope="col" className="text-truncate">
                  REF
                </th> */}
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <MDBSpinner size="sm" />
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No Commission Withdrawal Log Found
                  </td>
                </tr>
              ) : (
                logs.map(log => (
                  <CommsWithdrawalLogsTableRow key={log._id} log={log} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default CommsWithdrawalLogsTable;
