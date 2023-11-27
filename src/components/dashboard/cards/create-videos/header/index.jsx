import { MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const CreateVideoHeader = () => {
  return (
    <>
      <MDBContainer
        fluid
        className="cvheader-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="cvheader-title">
          <span className="title">VIDEO PLAYERS</span>
          <br />
          <span className="sub">LIST OF EMBEDABLE VIDEO PLAYERS</span>
        </div>
        {/* <div className="text-end cvheader-filter">
          WEB AND MOBILE EMBEDS <br />
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
        className="cvheader-body d-flex align-items-center justify-content-between py-2"
      ></MDBContainer>
    </>
  );
};

export default CreateVideoHeader;
