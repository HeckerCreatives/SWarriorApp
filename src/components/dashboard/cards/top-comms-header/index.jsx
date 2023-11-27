import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const TopCommsHeader = () => {
  return (
    <MDBCol className="px-3 my-3">
      <MDBContainer
        fluid
        className="tc-header d-flex align-items-center justify-content-between py-3"
      >
        <div className="tc-title">
          <span className="title">
            <MDBIcon fas icon="trophy" /> &nbsp;TOP COMMISSIONS
          </span>
        </div>
      </MDBContainer>
      <MDBContainer
        fluid
        className="tc-body d-flex align-items-center justify-content-between py-2"
      ></MDBContainer>
    </MDBCol>
  );
};

export default TopCommsHeader;
