import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import "./index.css";
import AgentMasterListTableRow from "./row";
import { useState } from "react";
import useAgentStore from "../../../../../stores/agentStore";

const SubAgentMasterListTable = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const getAgents = useAgentStore(state => state.agentGetMasters);
  const search = useAgentStore(state => state.agentSearchMasters);
  const agents = useAgentStore(state => state.master.agents);
  const totalPages = useAgentStore(state => state.master.totalPages);
  const nextPage = useAgentStore(state => state.master.nextPage);
  const prevPage = useAgentStore(state => state.master.prevPage);
  const loading = useAgentStore(state => state.loading.master);

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
      <MDBContainer fluid className="px-0 afl-table-container h-100">
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
                    No Master Found
                  </td>
                </tr>
              ) : (
                agents.map(agent => (
                  <AgentMasterListTableRow key={agent._id} agent={agent} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default SubAgentMasterListTable;
