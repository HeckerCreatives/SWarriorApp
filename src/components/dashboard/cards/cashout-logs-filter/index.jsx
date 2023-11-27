import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const CashoutLogsFilter = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="clf-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="clf-title">
          <span className="title">CASHOUT LOGS</span>
          <br />
          <span className="sub">Cashout Request Logs</span>
        </div>
        {/* <div className="text-end clf-filter">
          TOTAL RESULTS : 66 <br />
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
        className="clf-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="clf-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn>
        <MDBBtn className="clf-export-btn">
          EXPORT <MDBIcon fas icon="plus-square" size="lg" />
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default CashoutLogsFilter;
