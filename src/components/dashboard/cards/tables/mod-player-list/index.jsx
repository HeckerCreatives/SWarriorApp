import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React from "react";
import "./index.css";
import ModPlayerListTableRow from "./row";
import useAgentStore from "../../../../../stores/agentStore";
import { useState } from "react";
import { useEffect } from "react";

const ModPlayerListTable = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const getAgents = useAgentStore(state => state.getPlayers);
  const search = useAgentStore(state => state.searchPlayers);
  const agents = useAgentStore(state => state.player.agents);
  const totalPages = useAgentStore(state => state.player.totalPages);
  const nextPage = useAgentStore(state => state.player.nextPage);
  const prevPage = useAgentStore(state => state.player.prevPage);
  const loading = useAgentStore(state => state.loading.player);

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
      <MDBContainer fluid className="px-0 mpl-table-container h-100">
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
          <table className="mpl-table h-100">
            <thead>
              <tr className="mpl-line">
                <th scope="col" className="text-truncate">
                  UID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  BALANCE
                </th>
                <th scope="col" className="text-truncate">
                  ROLE
                </th>
                {/* <th scope="col" className="text-truncate">
                  SUB ROLE
                </th> */}
                <th scope="col" className="text-truncate">
                  EMAIL
                </th>
                <th scope="col" className="text-truncate">
                  REGISTERED MOBILE
                </th>
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                {/* <th scope="col" className="text-truncate">
                  VERIFICATION
                </th> */}
                <th scope="col" className="text-truncate">
                  REGISTER DATE
                </th>
                <th scope="col" className="text-truncate">
                  ACTIONS
                </th>
                <th scope="col" className="text-truncate">
                  Ghost Mode
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
                    No Players Found
                  </td>
                </tr>
              ) : (
                agents.map(agent => (
                  <ModPlayerListTableRow key={agent._id} agent={agent} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default ModPlayerListTable;
