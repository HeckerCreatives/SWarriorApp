import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const TransactionLogsFilter = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="tlf-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="tlf-title">
          <span className="title">TRANSACTION LOGS</span>
          <br />
          <span className="sub">User Transaction History</span>
        </div>
      </MDBContainer>
      <MDBContainer
        fluid
        className="tlf-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="tlf-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn>
        <MDBBtn className="tlf-export-btn">
          EXPORT <MDBIcon fas icon="plus-square" size="lg" />
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default TransactionLogsFilter;
