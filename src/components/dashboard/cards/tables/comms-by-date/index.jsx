import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import "./index.css";
import CommsByDateTableRow from "./row";
import useArenaStore from "../../../../../stores/arenaStore";

const CommsByDateTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const getArenas = useArenaStore(state => state.getArenas);

  const arenas = useArenaStore(state => state.arena.arenas);
  const totalPages = useArenaStore(state => state.arena.totalPages);
  const nextPage = useArenaStore(state => state.arena.nextPage);
  const prevPage = useArenaStore(state => state.arena.prevPage);
  const loading = useArenaStore(state => state.loading.arenas);
  const success = useArenaStore(state => state.success.create);
  const delSuccess = useArenaStore(state => state.success.remove);

  useEffect(() => {
    success && getArenas(limit, page);
  }, [success]);

  useEffect(() => {
    delSuccess && getArenas(limit, page);
  }, [delSuccess]);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getArenas(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getArenas(limit, prevPage);
    }
  };

  useEffect(() => {
    getArenas(limit, page);
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

      <MDBContainer fluid className="px-0 cbd-table-container h-100">
        <div className="table-responsive">
          <table className="cbd-table h-100">
            <thead>
              <tr className="cbd-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  EVENT NAME
                </th>
                <th scope="col" className="text-truncate">
                  FIGHTS
                </th>
                <th scope="col" className="text-truncate">
                  PLASADA
                </th>
                <th scope="col" className="text-truncate">
                  TIE RATE
                </th>
                <th scope="col" className="text-truncate">
                  LOGS
                </th>
                <th scope="col" className="text-truncate">
                  CREATION DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-2">
                    <MDBSpinner size="sm" />
                  </td>
                </tr>
              ) : arenas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-2">
                    No Arena Found
                  </td>
                </tr>
              ) : (
                arenas.map(arena => (
                  <CommsByDateTableRow key={arena._id} arena={arena} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default CommsByDateTable;
