import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";

const CommsWithdrawalForm = () => {
  return (
    <MDBCol>
      <MDBContainer fluid className="px-0">
        <MDBContainer fluid className="p-3 cwf2-header">
          <span>
            <MDBIcon fas icon="pen-square" />
            &nbsp;&nbsp;COMMISSION WITHDRAWAL FORM
          </span>
        </MDBContainer>
        <MDBContainer fluid className="py-4 cwf2-body">
          <MDBContainer className="py-4 cwf2-remaining text-center">
            <MDBTypography tag="h6">
              Remaining Withdrawable Commission
            </MDBTypography>
            <MDBTypography tag="h3">0.00</MDBTypography>
          </MDBContainer>
          <MDBContainer fluid className="px-0 mb-3">
            <div role="button" className="cwf2-btn-type py-2 px-4 mt-3 mb-2">
              <MDBIcon far icon="circle" />
              &nbsp;&nbsp;&nbsp;COMMISSION WALLET
            </div>
            <div
              role="button"
              className="cwf2-btn-type  py-2 px-4 cwf2-btn-type-active"
            >
              <MDBIcon far icon="dot-circle" />
              &nbsp;&nbsp;&nbsp;NORMAL WITHDRAWAL
            </div>
          </MDBContainer>
          <MDBContainer fluid className="px-0">
            <div className="position-relative px-4">
              <MDBIcon fas icon="print" className="cwf2-withdraw-icon" />
              <input
                type="text"
                className="form-control cwf2-input-text px-5"
                placeholder="Withdraw Amount"
              />
            </div>
          </MDBContainer>
          <MDBContainer className="px-0 my-3">
            <MDBBtn className="w-100 fs-5" color="success">
              WITHDRAW&nbsp;&nbsp;
              <MDBIcon fas icon="arrow-right" />
            </MDBBtn>
          </MDBContainer>
          <MDBContainer className="px-0 my-3 position-relative">
            <MDBContainer fluid className="cwf2-warning text-center py-2 px-5">
              <MDBIcon
                fas
                icon="times"
                className="cwf2-exit"
                size="2x"
                role="button"
              />
              <MDBIcon
                fas
                icon="exclamation-triangle"
                size="2x"
                className="mb-3 pt-3"
              />
              <br />
              <MDBTypography tag="p">
                If your commission withdrawal request was denied. The earnings
                will be restored back to your remaining withdrawable commission.
              </MDBTypography>
            </MDBContainer>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default CommsWithdrawalForm;
