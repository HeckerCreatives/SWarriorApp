import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import BettingLogsTableRow from "./row";
import useBetStore from "../../../../../stores/betStore";

const BettingLogsTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const getBets = useBetStore(state => state.adminGetBets);
  const bets = useBetStore(state => state.bet.bets);
  const totalPages = useBetStore(state => state.bet.totalPages);
  const nextPage = useBetStore(state => state.bet.nextPage);
  const prevPage = useBetStore(state => state.bet.prevPage);
  const loading = useBetStore(state => state.loading.bets);

  useEffect(() => {
    getBets(limit, page);
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
      getBets(limit, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
      getBets(limit, prevPage);
    }
  };

  return (
    <MDBCol className="px-3">
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

      <MDBContainer fluid className="px-0 blt-table-container h-100">
        <div className="table-responsive">
          <table className="blt-table h-100">
            <thead>
              <tr className="blt-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  ARENA
                </th>
                <th scope="col" className="text-truncate">
                  FIGHT NO.
                </th>
                <th scope="col" className="text-truncate">
                  BET AMOUNT
                </th>
                <th scope="col" className="text-truncate">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={12}>
                    <MDBCol size={12} className="text-center">
                      <MDBSpinner size="sm" color="white" />
                    </MDBCol>
                  </td>
                </tr>
              ) : bets.length === 0 ? (
                <tr>
                  <td colSpan={12}>
                    <MDBCol size={12} className="text-center text-white">
                      No Bet Found.
                    </MDBCol>
                  </td>
                </tr>
              ) : (
                bets.map(bet => <BettingLogsTableRow key={bet._id} bet={bet} />)
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default BettingLogsTable;
