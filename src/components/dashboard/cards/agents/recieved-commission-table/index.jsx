import { MDBCol, MDBContainer, MDBRow, MDBIcon } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "./index.css";

// ** Redux
// -

const CommissionsTableList = () => {
  return (
    <MDBCol className="h-100 mb-3">
      <div
        className="bg-warning text-center text-light square border-bottom   border-light border-3"
        style={{
          borderTopRightRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
        }}
      >
        Commissions History
      </div>
      <MDBRow className="mx-0 square border-bottom   border-light border-3">
        <MDBCol className="text-center text-light px-0 mx-0 ">Date</MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 ">
          Arena Name
        </MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 ">Fight #</MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 ">
          Commission Points
        </MDBCol>
      </MDBRow>
      <MDBContainer
        fluid
        className="bg-warning px-0 atl-table-container h-100"
        style={{ maxHeight: "180px" }}
      >
        <div className="table-responsive" style={{ height: "140px" }}>
          <table className="atl-table h-100">
            <tbody className="text-center">
              <tr className="text-center" style={{ maxHeight: "50px" }}>
                <td className="text-truncate px-0" style={{ width: "180px" }}>
                  Locale Date
                </td>
                <td className="text-truncate px-0" style={{ width: "180px" }}>
                  Event Name
                </td>
                <td className="text-truncate px-0" style={{ width: "180px" }}>
                  Round
                </td>
                <td className="text-truncate px-0" style={{ width: "180px" }}>
                  Commision
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <MDBContainer
          fluid
          className="px-0 mb-3 d-flex align-items-center justify-content-center"
        >
          <button className="tp-pager" role="button">
            <MDBIcon fas icon="angle-double-left" />
          </button>

          <div className="tp-page">{1}</div>

          <button className="tp-pager" role="button">
            <MDBIcon fas icon="angle-double-right" />
          </button>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default CommissionsTableList;
