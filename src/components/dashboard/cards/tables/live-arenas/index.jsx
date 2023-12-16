// ** React
import { useEffect, useState } from "react";

import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

import "./index.css";

import LiveArenaTableRow from "./row";
import cock from "../../../../../assets/images/superadmin/cockIco.png";
import sglive from "../../../../../assets/images/superadmin/sglive.png";
import useArenaStore from "../../../../../stores/arenaStore";

const LiveArenasTable = () => {
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
    <MDBCol className="px-3 ">
      <MDBContainer fluid className="p-3 live-arena-table-wrapper">
        <MDBContainer fluid className="live-arena-table-wrapper-bg">
          <MDBContainer fluid className="live-arena-table-container h-100">
            <MDBContainer
              fluid
              className="px-0 d-flex align-items-center justify-content-between py-2"
            >
              <div>
                <div className="mb-1 d-flex align-items-center text-white">
                  <img src={cock} alt="cock" className="img-fluid" />
                  &nbsp;&nbsp;
                  <span className="fs-6 fw-bold">SGLOBALLIVE</span>
                </div>
                <img src={sglive} alt="sglive" className="img-fluid" />
              </div>
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
            <div className="table-responsive">
              <table className="live-arena-table h-100">
                <thead>
                  <tr className="live-arena-line">
                    <th scope="col" className="text-truncate">
                      ID
                    </th>
                    <th scope="col" className="text-truncate text-center">
                      EVENT NAME
                    </th>
                    <th scope="col" className="text-truncate">
                      FIGHTS
                    </th>
                    <th scope="col" className="text-truncate">
                      MODERATOR
                    </th>
                    <th scope="col" className="text-truncate">
                      VIDEO
                    </th>
                    <th scope="col" className="text-truncate text-center">
                      EVENT TYPE
                    </th>
                    <th scope="col" className="text-truncate">
                      PLASADA RATE
                    </th>
                    <th scope="col" className="text-truncate">
                      TIE RATE
                    </th>
                    <th scope="col" className="text-truncate">
                      CREATED AT
                    </th>
                    <th scope="col" className="text-truncate">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arenas.map(arena => (
                    <LiveArenaTableRow key={arena._id} arena={arena} />
                  ))}
                </tbody>
              </table>
            </div>
          </MDBContainer>
          <MDBContainer
            fluid
            className="px-3 d-flex align-items-center justify-content-between py-3"
          >
            <div className="">
              <MDBBtn className="live-arena-controls la-btn-1 me-2 mb-2">
                <MDBIcon fas icon="cogs" /> CONTROL
              </MDBBtn>
              {/* <MDBBtn className="live-arena-controls la-btn-2 mb-2">
                <MDBIcon fas icon="cogs" /> GO TO ARENA
              </MDBBtn> */}
            </div>
            <div>{/* <ArenaLogsModal /> */}</div>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default LiveArenasTable;
