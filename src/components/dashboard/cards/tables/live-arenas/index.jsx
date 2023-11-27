// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Components
import LiveArenaTableRow from "./row";
import ArenaLogsModal from "./ArenaLogsModal";
import EditArenaModal from "./EditArenaModal";
import CloseArenaModal from "./CloseArenaModal";
import cock from "../../../../../assets/images/superadmin/cockIco.png";
import sglive from "../../../../../assets/images/superadmin/sglive.png";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { liveArena, setLiveArenaPage } from "../../../../../redux/slices/arena";

const LiveArenasTable = () => {
  // ** Vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexData, setSelectedIndexData] = useState([]);

  // ** States
  const storeArena = useSelector((state) => state.arena);
    
  useEffect(() => {
    dispatch(
      liveArena(
        `?_start=${
          (storeArena.liveArenaPage - 1) * storeArena.liveArenaItemsPerPage
        }&_limit=${
          storeArena.liveArenaItemsPerPage
        }&_isDeleted_ne=true&_sort=createdAt:DESC`
      )
    );
  }, [storeArena.liveArenaPage, storeArena.liveArenaItemsPerPage]);

  const handlePreviousPage = () => {
    dispatch(setLiveArenaPage(storeArena.liveArenaPage - 1));
  };

  const handleNextPage = () => {
    dispatch(setLiveArenaPage(storeArena.liveArenaPage + 1));
  };

  const handleClickedRow = (rowData) => {
    setSelectedIndexData(rowData);
  };

  const handleController = () => {
    if (selectedIndexData.length !== 0) {
      navigate(`/admin/arena?arena_id=${selectedIndexData.id}`);
    } else {
      toast.error("Please Select Arena", {
        duration: 3000,
      });
    }
  };

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
              <CloseArenaModal data={selectedIndexData} />
            </MDBContainer>
            <MDBContainer
              fluid
              className="px-0 mb-3 d-flex align-items-center justify-content-center"
            >
              <button
                className="tc-pager"
                role="button"
                onClick={handlePreviousPage}
                disabled={
                  storeArena.liveArenaPage === 1 || storeArena.tableLoader
                }
              >
                <MDBIcon fas icon="angle-double-left" />
              </button>
              <div className="tc-page">{storeArena.liveArenaPage}</div>
              <button
                className="tc-pager"
                role="button"
                onClick={handleNextPage}
                disabled={
                  storeArena.liveArena.length <
                    storeArena.liveArenaItemsPerPage || storeArena.tableLoader
                }
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
                  </tr>
                </thead>
                <tbody>
                  {storeArena.tableLoader ? (
                    <tr>
                      <td colSpan="12" className="text-center">
                        <div
                          className="spinner-border text-center"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : storeArena.liveArena?.length ? (
                    storeArena.liveArena?.map((item, i) => (
                      <LiveArenaTableRow
                        data={item}
                        key={`tr-${i}`}
                        index={item}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        onClickRow={handleClickedRow}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={12} className="text-center">
                        No Result Found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </MDBContainer>
          <MDBContainer
            fluid
            className="px-3 d-flex align-items-center justify-content-between py-3"
          >
            <div className="">
              <MDBBtn
                className="live-arena-controls la-btn-1 me-2 mb-2"
                onClick={handleController}
              >
                <MDBIcon fas icon="cogs" /> CONTROL
              </MDBBtn>
              {/* <MDBBtn className="live-arena-controls la-btn-2 mb-2">
                <MDBIcon fas icon="cogs" /> GO TO ARENA
              </MDBBtn> */}
            </div>
            <div>
              <EditArenaModal
                data={selectedIndexData}
                setSelectedIndex={setSelectedIndex}
              />
              <ArenaLogsModal data={selectedIndexData} />
            </div>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default LiveArenasTable;
