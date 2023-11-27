import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React from "react";

// ** Components
import AnimatedNumber from "../components/AnimatedNumber";

const ArenaRoundHeader = (item) => {
  return (
    <MDBCol>
      <MDBContainer fluid className="px-0 mb-2">
        <MDBContainer fluid className="p-1 arena-status-header text-center">
          <span>ROUND</span>
        </MDBContainer>
        <MDBContainer
          fluid
          className="pt-2 pb-2 pb-lg-3 pb-xl-2  arena-status-body"
        >
          <MDBTypography tag="h3" className="text-center m-0">
            
            <AnimatedNumber value={item.data.round || 0} />
          </MDBTypography>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaRoundHeader;
