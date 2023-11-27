import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import "./index.css";
import PlayerApprovalTableRow from "./row";

import useAgentStore from "../../../../../../stores/agentStore";
import { useState } from "react";

const PlayerApprovalTable = () => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const getAgents = useAgentStore(state => state.agentGetPendingUsers);
  const agents = useAgentStore(state => state.pending.agents);
  const totalPages = useAgentStore(state => state.pending.totalPages);
  const nextPage = useAgentStore(state => state.pending.nextPage);
  const prevPage = useAgentStore(state => state.pending.prevPage);
  const loading = useAgentStore(state => state.loading.pending);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getAgents(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getAgents(limit, prevPage);
    }
  };

  useEffect(() => {
    getAgents(limit, page);
  }, []);

  const appSuccess = useAgentStore(state => state.success.approve);
  const rejSuccess = useAgentStore(state => state.success.ban);

  useEffect(() => {
    if (appSuccess || rejSuccess) {
      getAgents(limit, page);
    }
  }, [appSuccess, rejSuccess]);

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
      <MDBContainer fluid className="px-0 pat3-table-container h-100">
        <div className="table-responsive">
          <table className="pat3-table h-100">
            <thead>
              <tr className="pat3-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  REGISTRATION DATE
                </th>
                <th scope="col" className="text-truncate">
                  ACTION
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
              ) : agents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Player Found
                  </td>
                </tr>
              ) : (
                agents.map(agent => (
                  <PlayerApprovalTableRow key={agent._id} agent={agent} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default PlayerApprovalTable;
