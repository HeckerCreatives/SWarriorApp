// ** React
import { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBSpinner,
  MDBTooltip,
} from "mdb-react-ui-kit";

import "./style.css";
import ArenaCard from "./card";
import CashoutHistoryModal from "./CashoutHistoryModal";
import useArenaStore from "../../stores/arenaStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useProfileStore from "../../stores/profileStore";

const ArenaList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const getArenas = useArenaStore(state => state.getArenas);
  const arenas = useArenaStore(state => state.arena.arenas);
  const totalPages = useArenaStore(state => state.arena.totalPages);
  const nextPage = useArenaStore(state => state.arena.nextPage);
  const prevPage = useArenaStore(state => state.arena.prevPage);
  const loading = useArenaStore(state => state.loading.arenas);

  const getProfile = useProfileStore(state => state.getProfile);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getArenas(limit, page);
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getVideos(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getVideos(limit, prevPage);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/login");
      }
    });
  };

  return (
    <MDBContainer fluid className="px-0 main-bg">
      <MDBContainer fluid className="px-0 mb-5 custom-topnav-bg">
        <MDBContainer fluid className="px-0 mb-5">
          <MDBCol
            xxl={2}
            xl={4}
            lg={4}
            md={5}
            sm={6}
            size={8}
            className="offset-xxl-10 offset-xl-8 offset-lg-8 py-2 offset-md-7 offset-sm-6 offset-4 topnav-tab-container"
          >
            <div className="d-flex align-items-center ">
              <div className="px-3">
                <MDBTooltip tag="a" title="Unprocess Bets">
                  <MDBIcon
                    role="button"
                    onClick={() => window.reload()}
                    fas
                    icon="rotate-right"
                    size="2x"
                  />
                </MDBTooltip>
              </div>
              <div className="px-3">
                <MDBTooltip tag="a" title="Cashout Logs">
                  <CashoutHistoryModal />
                </MDBTooltip>
              </div>
              <div className="px-3">
                <MDBTooltip tag="a" title="Sign out">
                  <MDBIcon
                    onClick={handleLogout}
                    fas
                    icon="sign-out-alt"
                    size="xl"
                    role="button"
                  />
                </MDBTooltip>
              </div>
            </div>
          </MDBCol>
        </MDBContainer>
        <MDBContainer fluid className="px-0 topnav-title-container ps-4 pt-2">
          <MDBTypography tag="h2" className="text-warning text-center">
            SELECT ARENA
          </MDBTypography>
        </MDBContainer>
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
      <MDBContainer fluid>
        <MDBRow className="justify-content-center align-items-start">
          {loading ? (
            <MDBCol size={12} className="text-center">
              <MDBSpinner size="sm" color="white" />
            </MDBCol>
          ) : arenas.length === 0 ? (
            <MDBCol size={12} className="text-center text-white">
              No Arena Found.
            </MDBCol>
          ) : (
            arenas.map(arena => <ArenaCard key={arena._id} arena={arena} />)
          )}
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ArenaList;
