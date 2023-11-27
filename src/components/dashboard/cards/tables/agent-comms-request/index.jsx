// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";

// ** React
import { useEffect, useState } from "react";

// ** Style
import "./index.css";
import useCashoutStore from "../../../../../stores/cashoutStore";
import CommissionRequestTableRow from "./row";

const AgentCommissionRequestTable = () => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const getCashouts = useCashoutStore(
    state => state.getReferralPendingCommissionRequest
  );
  const requests = useCashoutStore(state => state.allCommission.requests);
  const totalPages = useCashoutStore(state => state.allCommission.totalPages);
  const nextPage = useCashoutStore(state => state.allCommission.nextPage);
  const prevPage = useCashoutStore(state => state.allCommission.prevPage);
  const loading = useCashoutStore(state => state.loading.allCommission);

  const success = useCashoutStore(state => state.success.status);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getCashouts(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getCashouts(limit, prevPage);
    }
  };

  useEffect(() => {
    getCashouts(limit, page);
  }, []);

  useEffect(() => {
    if (success) {
      getCashouts(limit, page);
    }
  }, [success]);

  return (
    <MDBCol className="px-3">
      <Toaster />
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
      <MDBContainer fluid className="px-0 coreq-table-container h-100">
        <div className="table-responsive">
          <table className="coreq-table h-100">
            <thead>
              <tr className="coreq-line">
                <th scope="col" className="text-truncate">
                  UID
                </th>
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                <th scope="col" className="text-truncate">
                  USER
                </th>
                <th scope="col" className="text-truncate">
                  AMOUNT
                </th>
                <th scope="col" className="text-truncate">
                  DETAILS
                </th>
                <th scope="col" className="text-truncate">
                  PROCESSED BY
                </th>
                <th scope="col" className="text-truncate">
                  DATE
                </th>
                <th scope="col" className="text-truncate">
                  ACTIONS
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
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    No Cashout Request Found.
                  </td>
                </tr>
              ) : (
                requests.map(request => (
                  <CommissionRequestTableRow
                    key={request._id}
                    request={request}
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

export default AgentCommissionRequestTable;
