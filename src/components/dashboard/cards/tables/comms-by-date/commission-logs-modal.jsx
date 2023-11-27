import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState } from "react";
import toast from "react-hot-toast";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { arenaCommission } from "../../../../../redux/slices/commissionHistory";

const CommsLogsModal = (item) => {
  // ** Vars
  const dispatch = useDispatch();
  const storeCommissionHistory = useSelector(
    (state) => state.commissionHistory
  );

  // ** States
  const [centredModal, setCentredModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleShow = () => {
    if (item.data.length === 0) {
      toast.error("Please Select Arena", {
        duration: 3000,
      });
    } else {
      if (!centredModal) {
        dispatch(
          arenaCommission(
            `?_start=${
              (currentPage - 1) * itemsPerPage
            }&_limit=${itemsPerPage}&_game_history_id.arena_id.id=${
              item.data.id
            }`
          )
        );
      } else {
        setCurrentPage(1);
      }
      setCentredModal(!centredModal);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      const prev = prevPage - 1;
      dispatch(
        arenaCommission(
          `?_start=${
            (prev - 1) * itemsPerPage
          }&_limit=${itemsPerPage}&_game_history_id.arena_id.id=${item.data.id}`
        )
      );
      return prev;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const prev = prevPage + 1;

      dispatch(
        arenaCommission(
          `?_start=${
            (prev - 1) * itemsPerPage
          }&_limit=${itemsPerPage}&_game_history_id.arena_id.id=${item.data.id}`
        )
      );
      return prev;
    });
  };

  return (
    <>
      <div className="cbd-logs" role="button" onClick={toggleShow}>
        <MDBIcon fas icon="list" />
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="xl">
          <MDBModalContent className="ca-modal-body py-2 ">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 ca-modal-title"
            >
              <MDBIcon fas icon="warehouse" /> ARENA HISTORY
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="ca-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer
                fluid
                className="px-0 mb-3 d-flex align-items-center justify-content-center"
              >
                <button
                  className="tc-pager"
                  role="button"
                  onClick={handlePreviousPage}
                  disabled={
                    currentPage === 1 || storeCommissionHistory.isLoading
                  }
                >
                  <MDBIcon fas icon="angle-double-left" />
                </button>
                <div className="tc-page">{currentPage}</div>
                <button
                  className="tc-pager"
                  role="button"
                  onClick={handleNextPage}
                  disabled={
                    storeCommissionHistory.arenaCommission.length <
                      itemsPerPage || storeCommissionHistory.isLoading
                  }
                >
                  <MDBIcon fas icon="angle-double-right" />
                </button>
              </MDBContainer>
              <MDBContainer
                fluid
                className="px-0 position-relative text-center"
              >
                <MDBContainer className="ca-modal-panel py-2">
                  <div className="table-responsive">
                    <table className="closed-arena-table h-100">
                      <thead>
                        <tr className="closed-arena-line">
                          <th scope="col" className="text-truncate">
                            Arena
                          </th>
                          <th scope="col" className="text-truncate">
                            Fight No.
                          </th>
                          <th scope="col" className="text-truncate">
                            Commission
                          </th>
                          <th scope="col" className="text-truncate">
                            Player
                          </th>
                          <th scope="col" className="text-truncate">
                            Agent
                          </th>
                          <th scope="col" className="text-truncate">
                            Outcome
                          </th>
                          <th scope="col" className="text-truncate text-center">
                            Created At
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {storeCommissionHistory.isLoading ? (
                          <tr>
                            <td colSpan="12" className="text-center">
                              <div
                                className="spinner-border text-center"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </td>
                          </tr>
                        ) : storeCommissionHistory.arenaCommission.length ? (
                          storeCommissionHistory.arenaCommission.map((_, i) => (
                            <tr key={i}>
                              <td>{_?.arena_id?.eventName || "---"}</td>
                              <td>{_?.arena_id?.round || "---"}</td>
                              <td>{_.commision}</td>
                              <td>{_.player_id?.username}</td>
                              <td>{_.agent_id?.username}</td>
                              <td>{_.game_history_id.outcome}</td>
                              <td> {new Date(_.createdAt).toLocaleString()}</td>
                            </tr>
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
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CommsLogsModal;
