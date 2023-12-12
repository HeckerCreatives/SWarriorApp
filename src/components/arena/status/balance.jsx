import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import withdraw from "../../../assets/images/arena/withdraw.png";

import RequestCashoutModal from "./RequestCashoutModal";

const ArenaBalanceAmount = () => {
  return (
    <MDBContainer fluid className="px-0 mb-2">
      <MDBContainer fluid className="p-1 arena-status-header text-center">
        <span>BALANCE</span>
      </MDBContainer>
      <MDBContainer
        fluid
        className="pt-1 pb-1 arena-status-body position-relative"
      >
        <img
          src={withdraw}
          alt="withdraw"
          className="aba-withdraw-btn"
          role="button"
        />
        <RequestCashoutModal />
        <MDBTypography tag="h3" className="text-center m-0">
          {120}
        </MDBTypography>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ArenaBalanceAmount;
