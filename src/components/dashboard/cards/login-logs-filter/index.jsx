import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const LoginLogsFilter = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="llf-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="llf-title">
          <span className="title">LOGIN LOGS</span>
          <br />
          <span className="sub">User Login and Logout History</span>
        </div>
        {/* <div className="text-end llf-filter">
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
        className="llf-body d-flex align-items-center justify-content-between py-2"
      >
        {/* <MDBBtn className="llf-filter-btn">
          <MDBIcon fas icon="filter" size="lg" /> FILTER
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default LoginLogsFilter;
