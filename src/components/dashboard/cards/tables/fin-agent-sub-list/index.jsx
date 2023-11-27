import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "./index.css";
import AgentSubListTableRow from "./row";
import useAgentStore from "../../../../../stores/agentStore";

const FinancerAgentSubListTable = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const getAgents = useAgentStore(state => state.agentGetSubs);
  const search = useAgentStore(state => state.agentSearchSubs);
  const agents = useAgentStore(state => state.sub.agents);
  const totalPages = useAgentStore(state => state.sub.totalPages);
  const nextPage = useAgentStore(state => state.sub.nextPage);
  const prevPage = useAgentStore(state => state.sub.prevPage);
  const loading = useAgentStore(state => state.loading.sub);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      filter !== ""
        ? search(limit, nextPage, filter)
        : getAgents(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      filter !== ""
        ? search(limit, nextPage, filter)
        : getAgents(limit, prevPage);
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    const str = e.target.search.value;

    if (str.length !== 0) {
      search(limit, 1, str);
      setFilter(str);
    } else {
      getAgents(limit, 1);
      setFilter("");
    }
    setPage(1);
  };

  useEffect(() => {
    getAgents(limit, page);
  }, []);

  return (
    <MDBCol className="px-3">
      <MDBContainer fluid className="px-0 asl-table-container h-100">
        <form onSubmit={handleSearch}>
          <MDBContainer fluid className="p-2 d-flex gap-2 align-items-center">
            <div className="form-group position-relative flex-grow-1">
              <MDBIcon
                fas
                icon="search"
                className="afl-search-icon"
                size="lg"
              />
              <input
                type="search"
                className="form-control afl-search"
                id="search"
                placeholder="Search by Username"
              />
            </div>
            <MDBBtn color="warning" className="text-dark fw-bolder pt-2 pb-2">
              Search
            </MDBBtn>
          </MDBContainer>
        </form>

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

        <div className="table-responsive">
          <table className="afl-table h-100">
            <thead>
              <tr className="afl-line">
                <th scope="col" className="text-truncate">
                  UID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  POINTS
                </th>
                <th scope="col" className="text-truncate">
                  AVAILABLE COMMISSIONS
                </th>
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                <th scope="col" className="text-truncate">
                  VERIFIED
                </th>
                <th colSpan={3} scope="col" className="text-truncate">
                  ACTIONS
                </th>
                <th scope="col" className="text-truncate">
                  DATE REGISTERED
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center">
                    <MDBSpinner size="sm" />
                  </td>
                </tr>
              ) : agents.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center">
                    No Sub Found
                  </td>
                </tr>
              ) : (
                agents.map(agent => (
                  <AgentSubListTableRow key={agent._id} agent={agent} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default FinancerAgentSubListTable;
