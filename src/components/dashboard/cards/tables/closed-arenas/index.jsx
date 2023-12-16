// ** React
import { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import "./index.css";
import ClosedArenaTableRow from "./row";
import useArenaStore from "../../../../../stores/arenaStore";

const ClosedArenasTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const getClosedArenas = useArenaStore(state => state.getClosedArenas);
  const arenas = useArenaStore(state => state.closed.arenas);
  const totalPages = useArenaStore(state => state.closed.totalPages);
  const nextPage = useArenaStore(state => state.closed.nextPage);
  const prevPage = useArenaStore(state => state.closed.prevPage);
  const loading = useArenaStore(state => state.loading.arenas);

  useEffect(() => {
    getClosedArenas(limit, page);
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getClosedArenas(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getClosedArenas(limit, prevPage);
    }
  };

  return (
    <MDBCol className="px-3 ">
      <MDBContainer fluid className="p-3 closed-arena-table-wrapper">
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
        <MDBContainer fluid className="closed-arena-table-wrapper-bg">
          <MDBContainer fluid className="closed-arena-table-container h-100">
            <div className="table-responsive">
              <table className="closed-arena-table h-100">
                <thead>
                  <tr className="closed-arena-line">
                    <th scope="col" className="text-truncate">
                      ID
                    </th>
                    <th scope="col" className="text-truncate">
                      LOCATION
                    </th>
                    <th scope="col" className="text-truncate">
                      EVENT NAME
                    </th>
                    <th scope="col" className="text-truncate">
                      FIGHTS
                    </th>
                    <th scope="col" className="text-truncate text-center">
                      MODERATOR
                    </th>
                    <th scope="col" className="text-truncate">
                      VIDEO
                    </th>
                    <th scope="col" className="text-truncate">
                      EVENT TYPE
                    </th>
                    <th scope="col" className="text-truncate">
                      PLASADA RATE
                    </th>
                    <th scope="col" className="text-truncate">
                      TIE RATE
                    </th>
                    <th scope="col" className="text-truncate">
                      CREATION DATE
                    </th>
                    <th scope="col" className="text-truncate">
                      LOGS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? ""
                    : arenas.length === 0
                    ? ""
                    : arenas.map(arena => (
                        <ClosedArenaTableRow key={arena._id} data={arena} />
                      ))}
                </tbody>
              </table>
            </div>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ClosedArenasTable;
