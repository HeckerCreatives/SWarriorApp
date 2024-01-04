import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import usePlayerArenaStore from "../../../stores/playerArenaStore";

const ArenaRoundHeader = () => {
  const arena = usePlayerArenaStore(state => state.arena);

  return (
    <MDBCol>
      <MDBContainer fluid className="px-0 mb-2">
        <MDBContainer
          fluid
          className="p-1 arena-status-header text-center fs-6"
        >
          <span>Fight No.</span>
        </MDBContainer>
        <MDBContainer
          fluid
          className="pt-2 pb-2 pb-lg-3 pb-xl-2 arena-status-body"
        >
          <MDBTypography
            tag="h6"
            className="text-center m-0 py-1"
            style={{ textTransform: "uppercase" }}
          >
            {arena?.fights}
          </MDBTypography>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaRoundHeader;
