// ** Third Party Components
import { MDBCol, MDBContainer,MDBIcon } from "mdb-react-ui-kit";

// ** React
import { useEffect, useState } from "react";

// ** Style
import "./index.css";

// ** Components
import ArenaCommissionsTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { closeArena } from "../../../../../redux/slices/arena";

const ArenaCommissionsTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const storeArena = useSelector((state) => state.arena);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(closeArena(
      `?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`
    ));
  }, [currentPage, itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  
  

  return (
    <MDBCol className="px-3">

<MDBContainer
            fluid
            className="px-0 mb-3 d-flex align-items-center justify-content-center"
          >
            <button
              className="tp-pager"
              role="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <MDBIcon fas icon="angle-double-left" />
            </button>
            <div className="tp-page">{currentPage}</div>
            {/* <div className="tp-page">1</div> */}
            {/* <span className="tp-page-dot">...</span> */}
            {/* <div className="tp-page">3091</div> */}
            <button
              className="tp-pager"
              role="button"
              onClick={handleNextPage}
              disabled={itemsPerPage < itemsPerPage}
            >
              <MDBIcon fas icon="angle-double-right" />
            </button>
          </MDBContainer>
      <MDBContainer fluid className="px-0 arena-comms-table-container h-100">
        <div className="table-responsive">
          <table className="arena-comms-table h-100">
            <thead>
              <tr className="arena-comms-line">
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
                {/* <th scope="col" className="text-truncate">
                  CREATOR
                </th> */}
                <th scope="col" className="text-truncate">
                  TYPE
                </th>
                <th scope="col" className="text-truncate">
                  PLASADA
                </th>
                <th scope="col" className="text-truncate">
                  TIE RATE
                </th>
                {/* <th scope="col" className="text-truncate">
                  COMMISSIONS
                </th> */}
                <th scope="col" className="text-truncate">
                  LOGS
                </th>
                <th scope="col" className="text-truncate">
                  CREATION DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {storeArena.tableLoader ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : storeArena.closeArena?.length ? (
                storeArena.closeArena?.map((item, i) => (
                  <ArenaCommissionsTableRow key={`tr-${i}`} data={item} />
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
    </MDBCol>
  );
};

export default ArenaCommissionsTable;
