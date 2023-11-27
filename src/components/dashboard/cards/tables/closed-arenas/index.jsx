// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Components
import ClosedArenaTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { closeArena } from "../../../../../redux/slices/arena";

const ClosedArenasTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** Redux State
  const storeArena = useSelector((state) => state.arena);

  // ** React State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  useEffect(() => {
    dispatch(
      closeArena(
        `?_start=${
          (currentPage - 1) * itemsPerPage
        }&_limit=${itemsPerPage}&_isDeleted_eq=true&_sort=createdAt:DESC`
      )
    );
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      const prev = prevPage - 1;
      dispatch(
        closeArena(
          `?_start=${
            (prev - 1) * itemsPerPage
          }&_limit=${itemsPerPage}&_isDeleted_eq=true&_sort=createdAt:DESC`
        )
      );
      return prev;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const prev = prevPage + 1;

      dispatch(
        closeArena(
          `?_start=${
            (prev - 1) * itemsPerPage
          }&_limit=${itemsPerPage}&_isDeleted_eq=true&_sort=createdAt:DESC`
        )
      );
      return prev;
    });
  };

  return (
    <MDBCol className="px-3 ">
      <MDBContainer fluid className="p-3 closed-arena-table-wrapper">
        <MDBContainer
          fluid
          className="px-0 mb-3 d-flex align-items-center justify-content-center"
        >
          <button
            className="tc-pager"
            role="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1 || storeArena.tableLoader}
          >
            <MDBIcon fas icon="angle-double-left" />
          </button>
          <div className="tc-page">{currentPage}</div>
          <button
            className="tc-pager"
            role="button"
            onClick={handleNextPage}
            disabled={
              storeArena.closeArena.length < itemsPerPage ||
              storeArena.tableLoader
            }
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
                    {/* <th scope="col" className="text-truncate text-center">
                      MODERATOR
                    </th> */}
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
                  ) : storeArena.closeArena?.length ? (
                    storeArena.closeArena?.map((item, i) => (
                      <ClosedArenaTableRow key={`tr-${i}`} data={item} />
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
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ClosedArenasTable;
