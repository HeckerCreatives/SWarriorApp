import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const CsrListExport = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="cle-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="cle-title">
          <span className="title">CSR USER LIST</span>
          <br />
          {/* <span className="sub">Total User Points 0.00</span> */}
        </div>
        {/* <div className="text-end cle-filter">
          TOTAL RESULTS : 1 <br />
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
        className="cle-body d-flex align-items-center justify-content-end py-2"
      >
        {/* <MDBBtn className="cle-filter-btn">
          EXPORT &nbsp;&nbsp;&nbsp;
          <MDBIcon fas icon="angle-down" size="lg" />
        </MDBBtn> */}
      </MDBContainer>
    </MDBCol>
  );
};

export default CsrListExport;
