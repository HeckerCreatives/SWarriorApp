import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import "./index.css";

const VarianceCheck = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="SUPER ADMIN / Variance Check" />
      <MDBRow className="mx-0 px-2 mt-2">
        <MDBCol xxl={4} xl={6} lg={8} md={10} className="variance-wrapper p-2">
          <MDBContainer fluid className="px-0  variance-container">
            <MDBContainer fluid className="p-3 variance-header">
              <span>
                <MDBIcon fas icon="clipboard-check" />
                &nbsp;&nbsp;VARIANCE CHECKER
              </span>
            </MDBContainer>
            <MDBContainer fluid className="p-3 variance-body">
              <div className="variance-calculated py-3 mb-3">
                <span>Calculated Variance</span>
                <MDBTypography tag="h2">0.00</MDBTypography>
              </div>
              <div className="variance-items">
                <span className="text-primary">Total Deposits</span>
                <span className="text-success">0.00</span>
              </div>
              <div className="variance-items">
                <span className="text-primary">Total Withdrawal</span>
                <span className="text-success">0.00</span>
              </div>
              <div className="variance-items">
                <span className="text-primary">Total Previous Points</span>
                <span className="text-success">0.00</span>
              </div>
              <div className="variance-items">
                <span className="text-primary">Total User Points</span>
                <span className="text-success">0.00</span>
              </div>
              <div className="variance-items">
                <span className="text-primary">Total Commissions</span>
                <span className="text-success">0.00</span>
              </div>
              <div className="variance-items">
                <span className="text-primary">Total Draw Commissions</span>
                <span className="text-success">0.00</span>
              </div>
              <div className="variance-items">
                <span className="text-primary">Untracked Commissions</span>
                <span className="text-success">0.00</span>
              </div>
              <div className="variance-items">
                <span className="text-primary">Untracked Draw Commissions</span>
                <span className="text-success">0.00</span>
              </div>
              <div className="variance-items">
                <span className="text-primary">Total Floating Bets</span>
                <span className="text-success">0.00</span>
              </div>
              <div className="variance-items-final">
                <span className="text-primary">Final Computation</span>
                <span className="text-primary">0.00</span>
              </div>
              <div className="variance-text px-4">
                Note: Final variance computation could contain a positive (+) or
                a negative (-) value and must not be more o less than zero. In
                any case that the variance is more than o less than zero, please
                contact the accountant immediately.
              </div>
            </MDBContainer>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default VarianceCheck;
