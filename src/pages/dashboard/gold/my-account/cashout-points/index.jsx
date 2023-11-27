import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import AgentRequestCashout from "../../../../../components/dashboard/cards/points/cashout/request";
import AgentCashoutStatus from "../../../../../components/dashboard/cards/points/cashout/status";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const GoldCashoutPoints = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="MY ACCOUNT / Cashout Points" />
      <MDBContainer fluid className="px-0 mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={4} xl={6} lg={4}>
            <AgentRequestCashout />
          </MDBCol>
          <MDBCol xxl={8} xl={6} lg={8}>
            <AgentCashoutStatus />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default GoldCashoutPoints;
