import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import CommissionBreakdown from "./breakdown";
import BreakdownEarnings from "./earnings";
import BreakdownFilter from "./filter";
import "./index.css";

const FinCommissionsBreakdown = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="COMMISSIONS / Commission Breakdown" />
      <MDBContainer fluid className="px-0 mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={4} xl={5} lg={6}>
            <BreakdownFilter />
            <BreakdownEarnings />
          </MDBCol>
          <MDBCol xxl={8} xl={7} lg={6}>
            <CommissionBreakdown />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default FinCommissionsBreakdown;
