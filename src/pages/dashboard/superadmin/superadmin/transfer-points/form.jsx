// ** React
import { useState, useEffect, useRef } from "react";
import Select from "react-select";

// ** Third Party Components
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";

import { Toaster } from "react-hot-toast";
import useUserStore from "../../../../../stores/userStore";
import { errToast } from "../../../../../utility/toaster";
import useTransferStore from "../../../../../stores/transferStore";
import Swal from "sweetalert2";

const TransferPointsForm = () => {
  const getOwnPoints = useUserStore(state => state.getCreditOwned);
  const pointsOwned = useUserStore(state => state.points);
  const ownLoads = useUserStore(state => state.loading.points);

  useEffect(() => {
    getOwnPoints();
  }, []);

  const [sender, setSender] = useState({
    label: "",
    value: "",
  });

  const [receiver, setReceiver] = useState({
    label: "",
    value: "",
  });

  const getSenders = useUserStore(state => state.getSenders);
  const senders = useUserStore(state => state.senders);
  const senderLoads = useUserStore(state => state.loading.sender);
  const handleSenderSearch = val => {
    getSenders(val);
  };
  const handleSenderChange = val => setSender(val);

  const getRecievers = useUserStore(state => state.getReceivers);
  const receivers = useUserStore(state => state.receivers);
  const receiverLoads = useUserStore(state => state.loading.receiver);
  const handleReceiverSearch = val => {
    getRecievers(val);
  };
  const handleReceiverChange = val => setReceiver(val);

  const transfer = useTransferStore(state => state.transferCredit);
  const reset = useTransferStore(state => state.resetSuccess);
  const loading = useTransferStore(state => state.loading.credit);
  const success = useTransferStore(state => state.success.credit);

  useEffect(() => {
    if (success) {
      document.getElementById("myForm").reset();
      setSender({ label: "", value: "" });
      setReceiver({ label: "", value: "" });
      getOwnPoints();
      reset();
    }
  }, [success]);

  const handleTransfer = e => {
    e.preventDefault();

    const { amount } = e.target;

    if (sender.label === "" || sender.value === "") {
      errToast("Please select the sender.");
      return;
    }

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

    Swal.fire({
      title: `Are you sure you want to transfer funds from ${sender.label} to ${receiver.label}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const transferData = {
          senderId: sender.value,
          sender: sender.label,
          receiverId: receiver.value,
          receiver: receiver.label,
          amount: amount.value,
        };

        transfer(transferData);
      }
    });
  };

  return (
    <MDBCol className="tpf-wrapper p-2">
      <Toaster />
      <MDBContainer fluid className="px-0 py-4 tpf-container">
        <MDBContainer fluid className="px-3 tpf-header-line pb-3">
          <span>
            <MDBIcon fas icon="exchange-alt" />
            &nbsp;&nbsp;TRANSFER POINTS FORM
          </span>
        </MDBContainer>

        <form
          onSubmit={handleTransfer}
          autoComplete="off"
          noValidate
          id="myForm"
        >
          <MDBContainer fluid className="tpf-body">
            <div className="mt-1">
              <span className="cwc-label">Your Points:</span>&nbsp;&nbsp;
              <span className="cwc-points">
                {ownLoads ? (
                  <MDBSpinner size="sm" />
                ) : (
                  Number(pointsOwned).toFixed(2)
                )}
              </span>
            </div>

            <div className="mb-4 mt-1">
              <Select
                options={senders}
                isLoading={senderLoads}
                placeholder="Please Select Sender"
                onInputChange={handleSenderSearch}
                onChange={handleSenderChange}
              />
            </div>

            <div className="mb-4">
              <Select
                options={receivers}
                isLoading={receiverLoads}
                placeholder="Please Select Receiver"
                onInputChange={handleReceiverSearch}
                onChange={handleReceiverChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                min="1"
                className="form-control atp-footer-input"
              />
            </div>
            <div className="mb-4">
              <MDBBtn
                disabled={loading}
                className="w-100 fw-bold"
                color="warning"
              >
                {loading ? (
                  <MDBSpinner size="sm" />
                ) : (
                  <>
                    <MDBIcon fas icon="exchange-alt" />
                    &nbsp;&nbsp;START TRANSFER
                  </>
                )}
              </MDBBtn>
            </div>
          </MDBContainer>
        </form>
      </MDBContainer>
    </MDBCol>
  );
};

export default TransferPointsForm;
