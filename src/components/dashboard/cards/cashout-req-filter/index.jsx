import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import "./index.css";

const CashoutRequestFilter = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="coreqfilter-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="coreqfilter-title">
          <span className="title">CASHOUT REQUEST</span>
          <br />
          <span className="sub">MASTER AGENT CASHOUT REQUEST</span>
        </div>
        {/* <div className="text-end coreqfilter-filter">
          TOTAL RESULTS : {storeCashout.cashoutRequestCount} <br />
          <MDBIcon
            fas
            icon="redo-alt"
            size="xl"
            className="text-white"
            role="button"
          />
        </div> */}
      </MDBContainer>
      <MDBContainer
        fluid
        className="coreqfilter-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="coreqfilter-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn>
        <MDBBtn className="coreqfilter-export-btn">
          EXPORT <MDBIcon fas icon="plus-square" size="lg" />
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default CashoutRequestFilter;
