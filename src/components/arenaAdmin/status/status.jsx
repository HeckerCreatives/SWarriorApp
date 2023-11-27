// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";

// ** Redux
import { useSelector } from "react-redux";

const ArenaHeaderStatus = () => {
  // ** States
  const storeRoundStatus = useSelector((state) => state.roundStatus);
    
  return (
    <MDBCol>
      <MDBContainer fluid className="px-0 mb-2">
        <MDBContainer fluid className="p-1 arena-status-header text-center">
          <span>STATUS</span>
        </MDBContainer>
        <MDBContainer
          fluid
          className="pt-2 pb-2 pb-lg-3 pb-xl-2  arena-status-body"
        >
          <MDBTypography
            tag="h3"
            className="text-center m-0"
            style={{ textTransform: "uppercase" }}
          >
            {storeRoundStatus.isLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-grow text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              storeRoundStatus.roundStatus?.status
            )}
          </MDBTypography>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaHeaderStatus;
