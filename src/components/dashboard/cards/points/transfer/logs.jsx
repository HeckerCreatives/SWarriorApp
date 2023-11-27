import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import useTransferStore from "../../../../../stores/transferStore";

const AgentTransferPointsLogs = () => {
  const limit = 10;
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

  const handleCharLimit = str => `${str.substring(0, 15)}...`;

  const handleDate = date =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <MDBCol className="atp-wrapper p-2">
      <MDBContainer fluid className="px-0 atp-container">
        <MDBContainer
          fluid
          className="atp-header py-2 d-flex align-items-center justify-content-between"
        >
          <span>
            <MDBIcon fas icon="list-alt" />
            &nbsp;&nbsp;RECENT TRANSFERS
          </span>
          <MDBIcon
            fas
            icon="chevron-circle-right"
            size="2x"
            className="text-warning"
          />
        </MDBContainer>
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
        <MDBContainer fluid className="px-0 atp-body">
          <div className="table-responsive">
            <table className="acs-table h-100">
              <thead>
                <tr className="acs-line">
                  <th scope="col" className="text-truncate">
                    UID
                  </th>
                  <th scope="col" className="text-truncate">
                    AMOUNT
                  </th>
                  <th scope="col" className="text-truncate">
                    SENDER
                  </th>
                  <th scope="col" className="text-truncate">
                    RECEIVER
                  </th>
                  <th scope="col" className="text-truncate">
                    TRANSFERRED DATE
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
                      No Transfer Histories
                    </td>
                  </tr>
                ) : (
                  histories.map(history => (
                    <tr className="text-center" key={history._id}>
                      <td className="text-truncate">
                        <div className="mal-sid">
                          {handleCharLimit(history._id)}
                        </div>
                      </td>
                      <td className="text-truncate">
                        {Number(history.amount)}
                      </td>
                      <td className="text-truncate">
                        {history.sender.username}
                      </td>
                      <td className="text-truncate">
                        {history.receiver.username}
                      </td>
                      <td className="text-truncate">
                        {handleDate(history.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentTransferPointsLogs;
