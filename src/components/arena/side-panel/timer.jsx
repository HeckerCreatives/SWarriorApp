// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";

// ** Components
import clock from "../../../assets/images/arena/clock.png";

const ArenaBettingTime = () => {
  return (
    <MDBCol className="arena-betting-wrapper">
      <MDBContainer fluid className="px-0 mb-2">
        <MDBContainer fluid className="px-1 arena-status-header text-center">
          <span>BETTING TIME</span>
        </MDBContainer>
        <MDBContainer fluid className="py-1 arena-bet-body position-relative">
          <img src={clock} className="bet-clock-img" alt="clock" />
          <MDBTypography tag="h3" className="text-center m-0">
            44
          </MDBTypography>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaBettingTime;
