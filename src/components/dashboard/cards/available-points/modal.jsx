// ** React
import { useState } from "react";
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
import useUserStore from "../../../../stores/userStore";
import { useEffect } from "react";
import { errToast } from "../../../../utility/toaster";

const CashInPoints = () => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const cashin = useUserStore(state => state.cashinCredits);
  const reset = useUserStore(state => state.resetSuccess);
  const loading = useUserStore(state => state.loading.cashin);
  const success = useUserStore(state => state.success.cashin);

  useEffect(() => {
    if (success) {
      document.getElementById("cashinForm").reset();
      reset();
      setCentredModal(false);
    }
  }, [success]);

  const handleSubmit = e => {
    e.preventDefault();

    const { amount } = e.target;

    if (amount.value === "") {
      errToast("Please enter amount");
      return;
    }

    if (isNaN(amount.value)) {
      errToast("Please enter a valid amount");
      return;
    }

    if (amount.value <= 0) {
      errToast("Please enter a valid amount");
      return;
    }

    cashin({ amount: amount.value });
  };

  return (
    <>
      <div className="available-points-btn" role="button" onClick={toggleShow}>
        <MDBIcon fas icon="plus-square" size="xl" />
      </div>

      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={centredModal}
        setShow={setCentredModal}
      >
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="commswc-modal-body">
            <MDBModalBody>
              <MDBContainer
                fluid
                className="px-5 d-flex align-items-center justify-content-between mt-3 mb-4"
              >
                <div className="commswc-modal-title">ENTER CASH IN AMOUNT</div>
                <MDBIcon
                  onClick={toggleShow}
                  disabled={loading}
                  fas
                  icon="times"
                  className="text-warning commswc-modal-exit"
                  role="button"
                  size="2x"
                />
              </MDBContainer>
              <form
                onSubmit={handleSubmit}
                id="cashinForm"
                noValidate
                autoComplete="off"
              >
                <div className="d-flex align-items-center commswc-form-container p-2 mx-5">
                  <div className="flex-grow-1">
                    <input
                      type="number"
                      name="amount"
                      min="0"
                      className="form-control commswc-modal-input shadow-0"
                      disabled={loading}
                    />
                  </div>
                  {/* <MDBBtn className="commswc-modal-clear">
                    <MDBIcon fas icon="window-close" size="3x" />
                  </MDBBtn> */}
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

export default CashInPoints;
