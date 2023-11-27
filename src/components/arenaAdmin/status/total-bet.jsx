// ** React
import React, { useEffect, useState } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdb-react-ui-kit";

// ** Components
import AnimatedNumber from "../components/AnimatedNumber";

const ArenaTotalBetHeader = ({ data }) => {
  console.log("this is the betheader data", data);
  const [allbetData, setallBetData] = useState("");
  const [fakeBetMeron, setFakeBetMeron] = useState(0);
  const [fakeBetWala, setFakeBetWala] = useState(0);

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
                <div className="arena-bet-value-meron flex-grow-1">
                  {/* <AnimatedNumber value={allbetData ? (Number(allbetData.totalMeron)):(0)} /> */}

                  <AnimatedNumber
                    value={
                      allbetData
                        ? Number(allbetData.totalMeron + fakeBetMeron)
                        : 0
                    }
                  />
                </div>
              </MDBContainer>
            </MDBCol>
            <MDBCol size={6} className="px-1 px-xxl-3">
              <MDBContainer
                fluid
                className="arena-bet arena-bet-wala d-flex  px-2 py-1"
              >
                <div className="me-2">WALA</div>
                <div className="arena-bet-value-wala flex-grow-1">
                  {/* <AnimatedNumber value={allbetData ? (Number(allbetData.totalWala)):(0)} /> */}
                  <AnimatedNumber
                    value={
                      allbetData
                        ? Number(allbetData.totalWala + fakeBetWala)
                        : 0
                    }
                  />
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
