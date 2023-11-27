// ** React
import { useEffect } from "react";

// ** Third Party Components
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import "./index.css";
import { Toaster } from "react-hot-toast";
import PaymentModeModal from "./payment-mode-modal";
import RequestCashoutModal from "./request-cashout-modal";
import useUserStore from "../../../../../stores/userStore";

const AgentRequestCashout = () => {
  const getOwnedPoints = useUserStore(state => state.getCreditOwned);
  const points = useUserStore(state => state.points);
  const loading = useUserStore(state => state.loading.points);

  useEffect(() => {
    getOwnedPoints();
  }, []);

  return (
    <MDBCol className="arc-wrapper p-2 mb-3">
      <Toaster />
      <MDBContainer fluid className="p-3 arc-container">
        <MDBContainer fluid className="px-0 arc-header pt-2 pb-3">
          <span>
            <MDBIcon fas icon="print" />
            &nbsp;&nbsp;REQUEST CASHOUT
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 arc-body">
          <MDBContainer className="px-0 text-center arc-body-panel py-4 my-3">
            <span>
              Your Wallet Balance <br />{" "}
              {loading ? <MDBSpinner size="sm" /> : Number(points).toFixed(2)}
            </span>
          </MDBContainer>
          <div>
            <RequestCashoutModal />
          </div>

          <div className="arc-body-text">
            Edit your payment mode.
            <PaymentModeModal />
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentRequestCashout;
