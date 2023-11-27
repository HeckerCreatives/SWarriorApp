import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import "./index.css";
import PlayerActiveTableRow from "./row";
import { useState } from "react";
import useAgentStore from "../../../../../../stores/agentStore";

const PlayerActiveTable = () => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const getAgents = useAgentStore(state => state.agentGetActivePlayers);
  const agents = useAgentStore(state => state.player.agents);
  const totalPages = useAgentStore(state => state.player.totalPages);
  const nextPage = useAgentStore(state => state.player.nextPage);
  const prevPage = useAgentStore(state => state.player.prevPage);
  const loading = useAgentStore(state => state.loading.player);

  const success = useAgentStore(state => state.success.ban);

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

  useEffect(() => {
    if (success) {
      getAgents(limit, page);
    }
  }, [success]);

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
      <MDBContainer fluid className="px-0 pat2-table-container h-100">
        <div className="table-responsive">
          <table className="pat2-table h-100">
            <thead>
              <tr className="pat2-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  CREDIT BALANCE
                </th>
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                <th scope="col" className="text-truncate">
                  LAST BET
                </th>
                <th scope="col" className="text-truncate">
                  ACTION
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
              ) : agents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No Player Found
                  </td>
                </tr>
              ) : (
                agents.map(agent => (
                  <PlayerActiveTableRow key={agent._id} agent={agent} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default PlayerActiveTable;
