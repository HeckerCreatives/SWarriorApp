import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import "./index.css";
import PlayerDeactivatedTableRow from "./row";
import useAgentStore from "../../../../../../stores/agentStore";

const PlayerDeactivatedTable = () => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const getAgents = useAgentStore(state => state.agentGetBannedUsers);
  const agents = useAgentStore(state => state.banned.agents);
  const totalPages = useAgentStore(state => state.banned.totalPages);
  const nextPage = useAgentStore(state => state.banned.nextPage);
  const prevPage = useAgentStore(state => state.banned.prevPage);
  const loading = useAgentStore(state => state.loading.banned);

  const success = useAgentStore(state => state.success.ban);

  useEffect(() => {
    if (success) {
      getAgents(limit, page);
    }
  }, [success]);

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
      <MDBContainer fluid className="px-0 pdt-table-container h-100">
        <div className="table-responsive">
          <table className="pdt-table h-100">
            <thead>
              <tr className="pdt-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  ROLE
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
                  <td colSpan={5} className="text-center">
                    <MDBSpinner size="sm" />
                  </td>
                </tr>
              ) : agents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    No Users Found
                  </td>
                </tr>
              ) : (
                agents.map(agent => (
                  <PlayerDeactivatedTableRow key={agent._id} agent={agent} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default PlayerDeactivatedTable;
