import { useEffect } from "react";
import { MDBContainer, MDBCol, MDBTypography, MDBRow } from "mdb-react-ui-kit";

const BettingHistory = () => {
  const arrDumm = Array.from(Array(200));

  return (
    <MDBContainer fluid className="px-0">
      <MDBContainer
        fluid
        className="px-0 mx-0 topnav-title-container d-flex flex-wrap"
        style={{ overflow: "auto", maxHeight: "20rem" }}
      >
        {arrDumm.map((_, i) => (
          <MDBCol
            style={{ height: "3rem", width: "3rem" }}
            className="border d-flex align-items-center justify-content-center"
            size={1}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                minHeight: "2.5rem",
                minWidth: "2.5rem",
                height: "2.5rem",
                width: "2.5rem",
              }}
            >
              <span>1</span>
            </div>
          </MDBCol>
        ))}
      </MDBContainer>
    </MDBContainer>
  );
};

export default BettingHistory;
