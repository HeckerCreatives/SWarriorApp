import { useState, useEffect } from "react";
import sgLogo from "../../assets/images/sidebar/logo.png";
import {
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBSpinner,
} from "mdb-react-ui-kit";
import useBetStore from "../../stores/betStore";
import { useLocation } from "react-router-dom";
import { handleDate } from "../../utility/utils";

const ArenaNotification = () => {
  const { state } = useLocation();

  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const getArenaBetsByUser = useBetStore(state => state.getArenaBetsByUser);
  const bets = useBetStore(state => state.arenaBetsByUser);
  const loading = useBetStore(state => state.loading.arenaBetsByUser);

  useEffect(() => {
    getArenaBetsByUser(state._id);
  }, []);

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <MDBContainer className="my-2 mx-2">
      <div
        style={{
          position: "relative",
          display: "inline-block",
          cursor: "pointer",
        }}
      >
        <MDBIcon onClick={() => toggleShow()} fas icon="history" size="2x" />
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="xl">
          <MDBModalContent className="coreq-modal-body">
            <MDBModalHeader className="">
              <MDBModalTitle className="d-flex align-items-center justify-content-between w-100">
                <img
                  src={sgLogo}
                  alt="some logo"
                  style={{ height: "40px" }}
                  className=""
                />
                <h5 className="flex-grow-1 text-center m-0">
                  Bet And Outcome History
                </h5>
                <MDBBtn
                  className="btn-close btn-close-white me-1"
                  color="none"
                  onClick={toggleShow}
                />
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody
              className="justify-contents-center"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <MDBTable fluid className="tlt-table">
                <MDBTableHead fluid>
                  <tr className="">
                    <th scope="col" className="text-center text-truncate">
                      Date
                    </th>
                    <th scope="col" className="text-center text-truncate">
                      My Bet
                    </th>
                    <th scope="col" className="text-center text-truncate">
                      Amount
                    </th>
                    <th scope="col" className="text-center text-truncate">
                      Outcome
                    </th>
                    <th scope="col" className="text-center text-truncate">
                      Round #
                    </th>
                    <th scope="col" className="text-center text-truncate">
                      System Message
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ maxHeight: "100px", color: "white" }}>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <MDBSpinner size="sm" />
                      </td>
                    </tr>
                  ) : bets.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No Record Found
                      </td>
                    </tr>
                  ) : (
                    bets.map(bet => (
                      <tr key={bet._id}>
                        <th className="text-center text-truncate">
                          {handleDate(bet.createdAt)}
                        </th>
                        <td className="text-center text-capitalize text-truncate">
                          {bet.myBet}
                        </td>
                        <td className="text-center text-capitalize text-truncate">
                          {handleNumber(bet.amount)}
                        </td>
                        <td className="text-center text-capitalize text-truncate">
                          {bet.outcome}
                        </td>
                        <td className="text-center text-truncate">
                          {bet.round}
                        </td>
                        <td className="text-center text-truncate">
                          {bet.outcome === "cancel"
                            ? "Round Cancelled"
                            : bet.myBet === bet.outcome
                            ? "Congratulations You Won"
                            : "Better Luck Next Round"}
                        </td>
                      </tr>
                    ))
                  )}
                </MDBTableBody>
              </MDBTable>
            </MDBModalBody>
            <MDBModalFooter>
              {/* <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
};

export default ArenaNotification;
