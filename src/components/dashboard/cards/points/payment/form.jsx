import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const PaymentModeForm = () => {
  return (
    <MDBCol className="pmf-wrapper p-2 mb-3">
      <MDBContainer fluid className="p-0 pmf-container">
        <MDBContainer fluid className="px-3 py-3 pmf-header">
          <div className="pmf-title">
            <MDBIcon fas icon="plus" />
            &nbsp;&nbsp;ADD PAYMENT MODE
          </div>
          <div className="pmf-sub">
            Add your wallet details htmlFor a faster cashout request, you can
            enter a maximum of 5 wallet account.
          </div>
        </MDBContainer>
        <MDBContainer fluid className="p-3 pmf-body">
          <div className="mb-4 position-relative">
            <MDBIcon fas icon="wallet" className="pmf-input-icon" />
            <select className="form-select pmf-input pmf-input-select shadow-0">
              <option selected>Select Payment Mode</option>
            </select>
          </div>
          <div className="mb-4 position-relative">
            <MDBIcon fas icon="user-alt" className="pmf-input-icon" />
            <input
              type="text"
              className="form-control pmf-input pmf-input-text shadow-0"
              placeholder="Account Name"
            />
          </div>
          <div className="mb-4 position-relative">
            <MDBIcon fas icon="university" className="pmf-input-icon" />
            <input
              type="text"
              className="form-control pmf-input pmf-input-text shadow-0"
              placeholder="Account Number"
            />
          </div>
          <div className="mb-4 position-relative">
            <MDBIcon fas icon="file-signature" className="pmf-input-icon" />
            <textarea
              className="form-control pmf-input pmf-input-textarea shadow-0"
              rows="3"
              placeholder="Additional Details (Optional)"
            ></textarea>
          </div>
          <div className="form-check mb-4">
            <input
              className="form-check-input pmf-input-check"
              type="checkbox"
              value=""
            />
            <label
              className="form-check-label pmf-check-label"
              htmlFor="flexCheckDefault"
            >
              Use this as my default payment mode when cashing out.
            </label>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <MDBBtn color="warning" className="fw-bold">
              <MDBIcon far icon="save" />
              &nbsp;&nbsp;SAVE PAYMENT MODE
            </MDBBtn>
            <MDBBtn
              color="transparent"
              className="fw-bold shadow-0 text-primary"
            >
              REQUEST CASHOUT
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default PaymentModeForm;
