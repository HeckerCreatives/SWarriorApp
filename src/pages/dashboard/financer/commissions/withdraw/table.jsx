import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const CommsWithdrawalTable = () => {
  return (
    <MDBCol className="">
      <MDBContainer fluid className="px-0 atl-table-container h-100">
        <div className="table-responsive">
          <table className="atl-table h-100">
            <thead>
              <tr className="atl-line">
                <th scope="col" className="text-truncate">
                  REF
                </th>
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                <th scope="col" className="text-truncate">
                  PROCESSED BY
                </th>
                <th scope="col" className="text-truncate">
                  AMOUNT
                </th>
                <th scope="col" className="text-truncate">
                  DETAILS
                </th>
                <th scope="col" className="text-truncate">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td colSpan={6} className="text-center">
                  <small>No Records Found.</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <MDBContainer
          fluid
          className="px-0 d-flex align-items-center justify-content-center pt-3"
        >
          <div className="cws2-table-pager" role="button">
            <MDBIcon fas icon="angle-double-left" size="xl" />
          </div>
          <div className="cws2-table-page">1</div>
          <div className="cws2-table-pager" role="button">
            <MDBIcon fas icon="angle-double-right" size="xl" />
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default CommsWithdrawalTable;
