import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const BreakdownFilter = () => {
  return (
    <MDBCol className="bfc-wrapper">
      <MDBContainer fluid className="px-0 bfc-container">
        <MDBContainer fluid className="bfc-header py-2">
          <div className="bfc-header-title">
            <MDBIcon far icon="calendar-alt" />
            &nbsp;&nbsp;FILTER COMMISSION
          </div>
          <div className="bfc-header-subtitle">
            AGENT NETWORK PENDING COMMISSION WITHDRAWALS
          </div>
        </MDBContainer>
        <MDBContainer fluid className="bfc-body pb-3">
          <MDBContainer fluid className="py-3">
            <MDBContainer fluid className="px-0 bfcb-filter-header">
              <div className="px-2 py-1">Filter Select</div>
            </MDBContainer>
            <MDBContainer fluid className="px-0 bfcb-filter-body">
              <select
                className="form-select bfcb-input-select shadow-0"
                aria-label="Default select example"
              >
                <option selected>Select Month</option>
              </select>
            </MDBContainer>
          </MDBContainer>
          <MDBContainer fluid>
            <MDBContainer fluid className="bfcb-filter-month px-2 py-3">
              <div className="bfcb-filter-month-title pt-1">
                Filter By Month
              </div>
              <div className="pt-3">
                <div className="mb-3">
                  <input
                    type="date"
                    className="form-control bfcb-input-text shadow-0"
                  />
                </div>
              </div>
            </MDBContainer>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default BreakdownFilter;
