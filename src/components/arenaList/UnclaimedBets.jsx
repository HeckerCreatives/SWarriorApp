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
import { handleDate } from "../../utility/utils";

const UnclaimedBets = () => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const bets = [];
  const loading = false;

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <>
      <MDBIcon
        role="button"
        onClick={() => toggleShow()}
        fas
        icon="credit-card"
        size="2x"
      />

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
                  Unprocessed Bets
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
                    <th scope="col" className="text-center">
                      Bet
                    </th>
                    <th scope="col" className="text-center">
                      Amount
                    </th>
                    <th scope="col" className="text-center">
                      Arena
                    </th>
                    <th scope="col" className="text-center">
                      Round #
                    </th>
                    <th scope="col" className="text-center">
                      Date
                    </th>
                    <th scope="col" className="text-center">
                      Action
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
                        No Unprocessed bets
                      </td>
                    </tr>
                  ) : (
                    bets.map(bet => (
                      <tr key={bet._id}>
                        <th className="text-center">
                          {handleDate(bet.createdAt)}
                        </th>
                        <td className="text-center text-capitalize">
                          {bet.myBet}
                        </td>
                        <td className="text-center text-capitalize">
                          {handleNumber(bet.amount)}
                        </td>
                        <td className="text-center text-capitalize">
                          {bet.outcome}
                        </td>
                        <td className="text-center">{bet.round}</td>
                        <td className="text-center">
                          {bet.outcome === "cancel"
                            ? "Round Cancelled"
                            : bet.myBet === bet.outcome
                            ? "Congratulations You Won"
                            : "Better Luck Next Round"}
                        </td>
                        <td></td>
                      </tr>
                    ))
                  )}
                </MDBTableBody>
              </MDBTable>
            </MDBModalBody>
            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default UnclaimedBets;
