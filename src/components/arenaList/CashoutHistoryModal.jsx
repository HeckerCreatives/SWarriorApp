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

// ** React
import { useState, useEffect } from "react";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { cashoutLogs } from "../../redux/slices/cashout";

// import { allCashoutRequest } from "../../../../../redux/slices/cashout";

const CashoutHistoryModal = () => {
  // ** Vars
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const storeCashout = useSelector(state => state.cashout);

  console.log(storeCashout);

  // ** Login User
  const auth = "";

  const toggleShow = () => {
    if (!centredModal) {
      dispatch(
        cashoutLogs(
          `?_start=${
            (currentPage - 1) * itemsPerPage
          }&_limit=${itemsPerPage}&user_id.id=${auth.user.id}`
        )
      );
    } else {
      setCurrentPage(1);
    }
    setCentredModal(!centredModal);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => {
      const prev = prevPage - 1;
      dispatch(
        cashoutLogs(
          `?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`
        )
      );
      return prev;
    });
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => {
      const prev = prevPage + 1;

      dispatch(
        cashoutLogs(
          `?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`
        )
      );
      return prev;
    });
  };

  //   useEffect(() => {
  //     dispatch(
  //       cashoutLogs(
  //         `?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`
  //       )
  //     );
  //   }, [currentPage, itemsPerPage]);

  //   const handlePreviousPage = () => {
  //     setCurrentPage(currentPage - 1);
  //   };

  //   const handleNextPage = () => {
  //     setCurrentPage(currentPage + 1);
  //   };

  return (
    <>
      <MDBIcon
        fas
        icon="cash-register"
        size="xl"
        role="button"
        onClick={toggleShow}
      />

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="xl">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> Cashout Logs
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
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
                  disabled={currentPage === 1}
                >
                  <MDBIcon fas icon="angle-double-left" />
                </button>
                <div className="tc-page">{currentPage}</div>
                <button
                  className="tc-pager"
                  role="button"
                  onClick={handleNextPage}
                  disabled={storeCashout.cashoutLogs.length < itemsPerPage}
                >
                  <MDBIcon fas icon="angle-double-right" />
                </button>
              </MDBContainer>
              <MDBContainer fluid className="px-0 clt-table-container h-100">
                <div className="table-responsive">
                  <table className="clt-table h-100">
                    <thead>
                      <tr className="clt-line">
                        <th scope="col" className="text-truncate">
                          ID
                        </th>
                        {/* <th scope="col" className="text-truncate">
                  REF
                </th> */}
                        <th scope="col" className="text-truncate">
                          USERNAME
                        </th>
                        <th scope="col" className="text-truncate">
                          ASSIGNED TO
                        </th>
                        <th scope="col" className="text-truncate">
                          AMOUNT
                        </th>
                        {/* <th scope="col" className="text-truncate">
                  DETAILS
                </th> */}
                        <th scope="col" className="text-truncate">
                          LOG
                        </th>
                        <th scope="col" className="text-truncate">
                          DATE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {storeCashout.isLoading ? (
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
                      ) : storeCashout.cashoutLogs.length ? (
                        storeCashout.cashoutLogs.map((item, i) => (
                          <tr className="text-center" key={i}>
                            <td className="text-truncate">{item.id}</td>

                            <td className="text-truncate text-info">
                              {item.user_id.username}
                            </td>
                            <td className="text-truncate">
                              <div className="clt-assigned">
                                <MDBIcon fas icon="user-alt" />{" "}
                                {item.assign_to.username}
                              </div>
                            </td>
                            <td className="text-truncate text-primary">
                              {item.amount}
                            </td>
                            {/* <td className="text-truncate text-primary"></td> */}
                            <td
                              className={`text-truncate ${
                                item.details.includes("approve")
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              <small>{item.details}</small>
                            </td>
                            <td className="text-truncate">
                              <div className="clt-date">
                                {" "}
                                {new Date(item.createdAt).toLocaleString()}
                              </div>
                            </td>
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
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CashoutHistoryModal;
