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
import { useEffect, useState } from "react";
import useCashoutStore from "../../stores/cashoutStore";
import useProfileStore from "../../stores/profileStore";
import { handleCharLimit, handleDate } from "../../utility/utils";

const CashoutHistoryModal = () => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const limit = 10;
  const [page, setPage] = useState(1);

  const getRequests = useCashoutStore(state => state.getOwnCreditRequest);
  const loading = useCashoutStore(state => state.loading.ownCredit);
  const requests = useCashoutStore(state => state.ownCredit.requests);
  const totalPages = useCashoutStore(state => state.ownCredit.totalPages);
  const prevPage = useCashoutStore(state => state.ownCredit.prevPage);
  const nextPage = useCashoutStore(state => state.ownCredit.nextPage);

  const profile = useProfileStore(state => state.profile);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getRequests(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getRequests(limit, prevPage);
    }
  };

  useEffect(() => {
    getRequests(limit, page);
  }, []);

  const handleNumber = amount => Number(amount).toFixed(2);

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
              <MDBContainer fluid className="px-0 clt-table-container h-100">
                <div className="table-responsive">
                  <table className="clt-table h-100">
                    <thead>
                      <tr className="clt-line">
                        <th scope="col" className="text-truncate">
                          ID
                        </th>
                        <th scope="col" className="text-truncate">
                          USERNAME
                        </th>
                        <th scope="col" className="text-truncate">
                          ASSIGNED TO
                        </th>
                        <th scope="col" className="text-truncate">
                          AMOUNT
                        </th>
                        <th scope="col" className="text-truncate">
                          STATUS
                        </th>
                        <th scope="col" className="text-truncate">
                          DATE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? ""
                        : requests.length === 0
                        ? ""
                        : requests.map(request => (
                            <tr key={request._id} className="text-center">
                              <td className="text-truncate">
                                {handleCharLimit(request._id)}
                              </td>
                              <td className="text-truncate text-info">
                                {profile?.username}
                              </td>
                              <td className="text-truncate">
                                <div className="clt-assigned">
                                  <MDBIcon fas icon="user-alt" />{" "}
                                  {profile?.referrer}
                                </div>
                              </td>
                              <td className="text-truncate text-primary">
                                {handleNumber(request.amount)}
                              </td>
                              <td className={`text-truncate text-capitalize`}>
                                <small>{request.status}</small>
                              </td>
                              <td className="text-truncate">
                                <div className="clt-date">
                                  {handleDate(request.createdAt)}
                                </div>
                              </td>
                            </tr>
                          ))}
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
