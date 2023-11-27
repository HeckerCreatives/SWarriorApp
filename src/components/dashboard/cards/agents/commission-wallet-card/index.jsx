// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";

// ** CSS
import "./index.css";

// ** Components
import CommsWalletModal from "./modal";

const CommissionWalletCard = ({ title, points, icon, loading = false }) => {
  return (
    <MDBCol xxl={6} xl={6} lg={6} className="commswc-wrapper mb-3">
      <Toaster />
      <MDBContainer fluid className="px-0 commswc-container">
        <MDBContainer
          fluid
          className="p-3 commswc-header d-flex align-items-center justify-content-between"
        >
          <div>
            <MDBIcon fas icon={icon} />
            <span>&nbsp;&nbsp;{title}</span>
          </div>
          <CommsWalletModal amount={points} />
        </MDBContainer>
        <MDBContainer fluid className="px-0 commswc-body">
          <div className="py-4">
            <span className="commswc-label">Your Commissions</span>
            <br />
            <span className="commswc-points">
              {loading ? <MDBSpinner size="sm" /> : points}
            </span>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default CommissionWalletCard;
