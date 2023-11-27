import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const AgentMasterListHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="amlh-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="amlh-title">
          <span className="title">MASTER AGENT USER LIST</span>
          <br />
          {/* <span className="sub">Total User Points 0.00</span> */}
        </div>
        {/* <div className="text-end amlh-filter">
          TOTAL RESULTS : 613 <br />
          <MDBIcon
            fas
            icon="redo-alt"
            size="xl"
            className="text-white"
            role="button"
          />
        </div> */}
      </MDBContainer>
      {/* <MDBContainer
        fluid
        className="amlh-body d-flex align-items-center justify-content-end py-2"
      ></MDBContainer> */}
    </MDBCol>
  );
};

export default AgentMasterListHeader;
