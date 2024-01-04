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
import React, { useState } from "react";
import { errToast } from "../../../../../utility/toaster";
import Swal from "sweetalert2";
import useUserStore from "../../../../../stores/userStore";
import { useEffect } from "react";
import useProfileStore from "../../../../../stores/profileStore";

const PaymentModeModal = () => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const update = useUserStore(state => state.updatePaymentMethod);
  const reset = useUserStore(state => state.resetSuccess);
  const loading = useUserStore(state => state.loading.payment);
  const success = useUserStore(state => state.success.payment);

  const profile = useProfileStore(state => state.profile);

  useEffect(() => {
    if (success) {
      document.getElementById("myForm").reset();
      toggleShow();
      reset();
    }
  }, [success]);

  const handleSubmit = e => {
    e.preventDefault();

    const { payment_mode, account_name, account_number, additional_details } =
      e.target;

    if (payment_mode.value === "") {
      errToast("Please enter the payment mode.");
      return;
    }

    if (account_name.value === "") {
      errToast("Please enter the account name.");
      return;
    }

    if (account_number.value === "") {
      errToast("Please enter the account number.");
      return;
    }

    Swal.fire({
      title: "Are you sure you want to save this as your payment method?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const paymentMethodData = {
          paymentMode: payment_mode.value,
          acctName: account_name.value,
          acctNumber: account_number.value,
          addDetails: additional_details.value,
        };
        update(paymentMethodData);
      }
    });
  };

  return (
    <>
      <span className="text-primary fw-bold" onClick={toggleShow} role="button">
        Click Here
      </span>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBContainer fluid className="px-3 py-3 pmf-header">
              <div className="pmf-title">
                <MDBIcon fas icon="plus" />
                &nbsp;&nbsp;EDIT PAYMENT MODE
              </div>
              <div className="pmf-sub">
                Edit your wallet details for a faster cashout request, you can
                enter a maximum of 5 wallet account.
              </div>
            </MDBContainer>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer fluid className="p-0 ">
                  <MDBContainer fluid className="p-3 pmf-body">
                    <form
                      onSubmit={handleSubmit}
                      id="myForm"
                      autoComplete="off"
                    >
                      <div className="mb-4 position-relative">
                        <MDBIcon fas icon="wallet" className="pmf-input-icon" />
                        <input
                          type="text"
                          className="form-control pmf-input pmf-input-text shadow-0"
                          name="payment_mode"
                          placeholder="Enter Your Payment Mode"
                          defaultValue={profile?.details?.paymentMode}
                        />
                      </div>
                      <div className="mb-4 position-relative">
                        <MDBIcon
                          fas
                          icon="user-alt"
                          className="pmf-input-icon"
                        />
                        <input
                          type="text"
                          className="form-control pmf-input pmf-input-text shadow-0"
                          name="account_name"
                          placeholder="Account Name"
                          defaultValue={profile?.details?.bankAcctName}
                        />
                      </div>
                      <div className="mb-4 position-relative">
                        <MDBIcon
                          fas
                          icon="university"
                          className="pmf-input-icon"
                        />
                        <input
                          type="text"
                          className="form-control pmf-input pmf-input-text shadow-0"
                          placeholder="Account Number"
                          name="account_number"
                          defaultValue={profile?.details?.bankAcctNumber}
                        />
                      </div>
                      <div className="mb-4 position-relative">
                        <MDBIcon
                          fas
                          icon="file-signature"
                          className="pmf-input-icon"
                        />
                        <textarea
                          className="form-control pmf-input pmf-input-textarea shadow-0"
                          rows="3"
                          placeholder="Additional Details (Optional)"
                          name="additional_details"
                          defaultValue={profile?.details?.bankAcctAddDetails}
                        ></textarea>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <MDBBtn
                          disabled={loading}
                          color="warning"
                          className="fw-bold"
                        >
                          {loading ? (
                            <MDBSpinner size="sm" />
                          ) : (
                            <>
                              <MDBIcon far icon="save" />
                              &nbsp;&nbsp;SAVE PAYMENT MODE
                            </>
                          )}
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBContainer>
                </MDBContainer>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PaymentModeModal;
