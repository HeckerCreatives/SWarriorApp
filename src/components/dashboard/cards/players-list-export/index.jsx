import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const PlayersListExport = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="ple-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="ple-title">
          <span className="title">PLAYERS / CASHIERS LIST</span>
          <br />
          {/* <span className="sub">Total User Points 156,629.30</span> */}
        </div>
        {/* <div className="text-end ple-filter">
          TOTAL RESULTS : 154736 <br />
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
        className="ple-body d-flex align-items-center justify-content-end py-2"
      >
        {/* <MDBBtn className="ple-filter-btn">
          EXPORT &nbsp;&nbsp;&nbsp;
          <MDBIcon fas icon="angle-down" size="lg" />
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default PlayersListExport;
