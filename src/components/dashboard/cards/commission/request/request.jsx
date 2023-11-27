import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import "./index.css";
import { Toaster } from "react-hot-toast";
import RequestCashoutModal from "./request-cashout-modal";
import useUserStore from "../../../../../stores/userStore";
import { useEffect } from "react";

const AgentRequestCashout = () => {
  const getOwnComms = useUserStore(state => state.getCommissionOwned);
  const points = useUserStore(state => state.commission);
  const loading = useUserStore(state => state.loading.commission);

  useEffect(() => {
    getOwnComms();
  }, []);

  return (
    <MDBCol className="comms-req-wrapper p-2 mb-3">
      <Toaster />
      <MDBContainer fluid className="p-3 comms-req-container">
        <MDBContainer fluid className="px-0 comms-req-header pt-2 pb-3">
          <span>
            <MDBIcon fas icon="print" />
            &nbsp;&nbsp;REQUEST COMMISSION
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 comms-req-body">
          <MDBContainer className="px-0 text-center comms-req-body-panel py-4 my-3">
            <span>
              Your Commission Balance <br />
              {loading ? <MDBSpinner size="sm" /> : Number(points).toFixed(2)}
            </span>
          </MDBContainer>
          <div>
            <RequestCashoutModal />
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentRequestCashout;
