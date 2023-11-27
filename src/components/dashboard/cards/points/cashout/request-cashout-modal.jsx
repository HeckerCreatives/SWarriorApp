// ** React
import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { errToast } from "../../../../../utility/toaster";
import useUserStore from "../../../../../stores/userStore";
import { useEffect } from "react";
import Swal from "sweetalert2";

const RequestCashoutModal = data => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const points = useUserStore(state => state.points);
  const request = useUserStore(state => state.requestCreditCashout);
  const reset = useUserStore(state => state.resetSuccess);
  const loading = useUserStore(state => state.loading.cashoutCredit);
  const success = useUserStore(state => state.success.cashoutCredit);

  useEffect(() => {
    if (success) {
      document.getElementById("myForm").reset();
      reset();
      setCentredModal(false);
    }
  }, [success]);

  const handleSubmit = e => {
    e.preventDefault();

    const { amount } = e.target;

    if (amount.value === "") {
      errToast("Please enter an amount to cashout");
      return;
    }

    if (isNaN(amount.value)) {
      errToast("Invalid Amount");
      return;
    }

    if (points < parseFloat(amount.value)) {
      errToast("Insufficient Balance");
      return;
    }

    Swal.fire({
      title: `Are you sure you want to cashout ${amount.value} credits?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        request({ amount: amount.value });
      }
    });
  };

  return (
    <>
      <MDBBtn
        onClick={toggleShow}
        className="arc-button px-5 mb-3"
        disabled={data.disabled}
        block
      >
        Request Cashout
      </MDBBtn>
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="commswc-modal-body">
            <MDBModalBody>
              <MDBContainer
                fluid
                className="px-5 d-flex align-items-center justify-content-between mt-3 mb-4"
              >
                <div className="commswc-modal-title">ENTER AMOUNT</div>
                <MDBIcon
                  onClick={toggleShow}
                  fas
                  icon="times"
                  className="text-warning commswc-modal-exit"
                  role="button"
                  size="2x"
                />
              </MDBContainer>
              <form id="myForm" onSubmit={handleSubmit} autoComplete="off">
                <div className="d-flex align-items-center commswc-form-container p-2 mx-5">
                  <div className="flex-grow-1">
                    <input
                      type="number"
                      name="amount"
                      step="any"
                      min="0"
                      className="form-control commswc-modal-input shadow-0"
                      disabled={loading}
                    />
                  </div>
                </div>
                <MDBContainer fluid className="px-5 mt-4 text-center">
                  <MDBBtn
                    disabled={loading}
                    className="commswc-confirm-btn px-5"
                  >
                    {loading ? (
                      <MDBSpinner size="sm" />
                    ) : (
                      <>
                        <MDBIcon fas icon="check" />
                        &nbsp;&nbsp;CONFIRM
                      </>
                    )}
                  </MDBBtn>
                </MDBContainer>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default RequestCashoutModal;
