import Select from "react-select";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTypography,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import "./index.css";
import useUserStore from "../../../../../stores/userStore";
import useTransferStore from "../../../../../stores/transferStore";
import { useState } from "react";
import { useEffect } from "react";
import { errToast } from "../../../../../utility/toaster";
import Swal from "sweetalert2";

const AgentsTransferPointsForm = () => {
  const [receiver, setReceiver] = useState({
    label: "",
    value: "",
  });
  const [balance, setBalance] = useState(0);

  const getReceivers = useUserStore(state => state.csrGetReceivers);
  const receivers = useUserStore(state => state.receivers);
  const receiverLoads = useUserStore(state => state.loading.receiver);

  const handleReceiverSearch = val => {
    getReceivers(val);
  };
  const handleReceiverChange = val => {
    setBalance(Number(val.amount).toFixed(2));
    setReceiver(val);
  };

  const getOwnedPoints = useUserStore(state => state.getCreditOwned);
  const points = useUserStore(state => state.points);
  const ownLoads = useUserStore(state => state.loading.points);

  useEffect(() => {
    getOwnedPoints();
  }, []);

  const transfer = useTransferStore(state => state.agentTransferCredit);
  const reset = useTransferStore(state => state.resetSuccess);
  const loading = useTransferStore(state => state.loading.credit);
  const success = useTransferStore(state => state.success.credit);

  useEffect(() => {
    if (success) {
      document.getElementById("myForm").reset();
      setReceiver({ label: "", value: "" });
      setBalance(0);
      getOwnedPoints();
      reset();
    }
  }, [success]);

  const handleTransfer = e => {
    e.preventDefault();

    const { amount } = e.target;

    if (receiver.label === "" || receiver.value === "") {
      errToast("Please select the receiver.");
      return;
    }

    if (
      isNaN(amount.value) ||
      amount.value === "" ||
      parseFloat(amount.value) <= 0
    ) {
      errToast("Amount must be greater than 0.");
      return;
    }

    if (points < amount.value) {
      errToast("Sender have insufficient balance.");
      return;
    }

    Swal.fire({
      title: `Are you sure you want to transfer funds to ${receiver.label}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const transferData = {
          receiverId: receiver.value,
          receiver: receiver.label,
          amount: amount.value,
        };
        transfer(transferData);
      }
    });
  };

  return (
    <MDBCol className="atp-wrapper p-2 mb-3">
      <Toaster />
      <MDBContainer fluid className="p-0 atp-container">
        <MDBContainer fluid className="px-3 atp-header py-2">
          <span>
            <MDBIcon fas icon="exchange-alt" />
            &nbsp;&nbsp;TRANSFER POINTS FORM
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 atp-body">
          <div className="d-flex align-items-center justify-content-between px-3">
            <div className="atp-panel">
              <MDBTypography tag="p" className="m-0">
                Your Points
                <br />
                {ownLoads ? (
                  <MDBSpinner size="sm" />
                ) : (
                  Number(points).toFixed(2)
                )}
              </MDBTypography>
            </div>
            <div className="atp-panel-arrow">
              <MDBIcon fas icon="arrow-right" size="2x" />
            </div>
            <div className="atp-panel">
              <MDBTypography tag="p" className="m-0">
                {receiver.label === "" ? "Select Receiver" : receiver.label}
                <br />
                {balance}
              </MDBTypography>
            </div>
          </div>
          <form
            onSubmit={handleTransfer}
            noValidate
            autoComplete="off"
            id="myForm"
          >
            <div className="d-flex align-items-end mt-3 atp-footer pt-3 pb-4 px-3">
              <div className="flex-grow-1 me-2">
                <small className="text-muted">
                  Enter Points To Be Transferred
                </small>
                <input
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  step="any"
                  min="0"
                  className="form-control atp-footer-input py-2"
                />
              </div>
              <div className="flex-grow-1">
                <Select
                  options={receivers}
                  isLoading={receiverLoads}
                  className="text-dark"
                  placeholder="Please Select User"
                  onInputChange={handleReceiverSearch}
                  onChange={handleReceiverChange}
                />
              </div>
            </div>
            <div className="d-flex align-items-center pb-4 px-3 text-center">
              <div className="flex-grow-1 ">
                <MDBBtn disabled={loading} className="atp-button px-5">
                  {loading ? <MDBSpinner size="sm" /> : "Transfer"}
                </MDBBtn>
              </div>
            </div>
          </form>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentsTransferPointsForm;
