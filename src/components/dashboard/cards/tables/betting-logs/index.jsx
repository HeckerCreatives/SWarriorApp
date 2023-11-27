import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import BettingLogsTableRow from "./row";

const BettingLogsTable = () => {
  return (
    <MDBCol className="px-3">
      <MDBContainer
        fluid
        className="px-0 mb-3 d-flex align-items-center justify-content-center"
      >
        <button className="tp-pager" role="button">
          <MDBIcon fas icon="angle-double-left" />
        </button>

        <div className="tp-page">{1}</div>

        <button className="tp-pager" role="button">
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
                  TYPE
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
                  TEAM
                </th>
                {/* <th scope="col" className="text-truncate">
                  DETAILS
                </th> */}
                <th scope="col" className="text-truncate">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              <BettingLogsTableRow />
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default BettingLogsTable;
