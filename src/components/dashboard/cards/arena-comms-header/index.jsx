import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const ArenaCommissionsHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="arena-comms-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="arena-comms-title">
          <span className="title">ARENA COMMISSIONS</span>
          <br />
          <span className="sub">VIEW COMMISSIONS OF COMPLETED ARENAS</span>
        </div>
        {/* <div className="text-end arena-comms-filter">
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
        className="arena-comms-body d-flex align-items-center justify-content-between py-2"
      ></MDBContainer>
    </MDBCol>
  );
};

export default ArenaCommissionsHeader;
