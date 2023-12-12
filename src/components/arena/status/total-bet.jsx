// ** React
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdb-react-ui-kit";
import AnimatedNumber from "../components/AnimatedNumber";

const ArenaTotalBetHeader = ({ data }) => {
  return (
    <MDBCol>
      <MDBContainer fluid className="px-0 mb-2">
        <MDBContainer fluid className="p-1 arena-status-header text-center">
          <span>TOTAL BET</span>
        </MDBContainer>
        <MDBContainer
          fluid
          className="px-lg-0 px-xl-2 px-xxl-4 pt-2 pb-2 arena-status-body"
        >
          <MDBRow className="mx-0">
            <MDBCol size={6} className="px-1 px-xxl-3">
              <MDBContainer
                fluid
                className="arena-bet arena-bet-meron d-flex px-2 py-1"
              >
                <div className="me-2">MERON</div>
                <div className="arena-bet-value-meron flex-grow-1 animated-number">
                  <AnimatedNumber value={0} />
                </div>
              </MDBContainer>
            </MDBCol>

            <MDBCol size={6} className="px-1 px-xxl-3">
              <MDBContainer
                fluid
                className="arena-bet arena-bet-wala d-flex  px-2 py-1"
              >
                <div className="me-2">WALA</div>
                <div className="arena-bet-value-wala flex-grow-1 animated-number">
                  {false ? (
                    <div className="d-flex justify-content-center">
                      <MDBSpinner role="status" size="sm" color="light" grow>
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  ) : (
                    <AnimatedNumber value={0} />
                  )}
                </div>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaTotalBetHeader;
