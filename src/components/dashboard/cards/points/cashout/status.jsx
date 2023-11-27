// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

import useCashoutStore from "../../../../../stores/cashoutStore";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";
import useUserStore from "../../../../../stores/userStore";

const AgentCashoutStatus = () => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const getRequests = useCashoutStore(state => state.getOwnCreditRequest);
  const loading = useCashoutStore(state => state.loading.ownCredit);
  const requests = useCashoutStore(state => state.ownCredit.requests);
  const totalPages = useCashoutStore(state => state.ownCredit.totalPages);
  const prevPage = useCashoutStore(state => state.ownCredit.prevPage);
  const nextPage = useCashoutStore(state => state.ownCredit.nextPage);

  const success = useUserStore(state => state.success.cashoutCredit);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getRequests(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getRequests(limit, prevPage);
    }
  };

  useEffect(() => {
    getRequests(limit, page);
  }, []);

  useEffect(() => {
    if (success) {
      getRequests(limit, page);
    }
  }, [success]);

  return (
    <MDBCol>
      <MDBContainer
        fluid
        className="acs-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="acs-title">
          <span className="title">
            <MDBIcon fas icon="check-circle" />
            &nbsp;&nbsp;CASHOUT STATUS
          </span>
          <br />
          <span className="sub">MY CASHOUT REQUESTS</span>
        </div>
      </MDBContainer>
      <MDBContainer
        fluid
        className="acs-body d-flex align-items-center justify-content-between px-2 pb-2"
      >
        <MDBContainer fluid className="px-0 acs-table-container h-100">
          <div className="table-responsive">
            <table className="acs-table h-100">
              <thead>
                <tr className="acs-line">
                  <th scope="col" className="text-truncate">
                    UID
                  </th>
                  <th scope="col" className="text-truncate">
                    STATUS
                  </th>
                  <th scope="col" className="text-truncate">
                    AMOUNT
                  </th>
                  <th scope="col" className="text-truncate">
                    REQUEST DATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      <MDBSpinner size="sm" />
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No Request Found
                    </td>
                  </tr>
                ) : (
                  requests.map(request => (
                    <tr className="text-center" key={request._id}>
                      <td className="text-truncate">
                        <div className="mal-sid">
                          {handleCharLimit(request._id)}
                        </div>
                      </td>
                      <td className="text-truncate">
                        <div
                          className={`acs-pending-button d-flex align-items-center justify-content-center`}
                        >
                          &nbsp;{" "}
                          <span className="acs-status-text">
                            {request.status}
                          </span>
                        </div>
                      </td>
                      <td className="text-truncate">{request.amount}</td>

                      <td className="text-truncate">
                        {handleDate(request.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <MDBContainer
            fluid
            className="px-0 d-flex align-items-center justify-content-center mt-3"
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
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentCashoutStatus;
