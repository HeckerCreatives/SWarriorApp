import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import AgentRequestCommission from "../../../../../components/dashboard/cards/commission/request/request";
import AgentCommissionStatus from "../../../../../components/dashboard/cards/commission/request/status";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const SubCashoutPoints = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="MY ACCOUNT / Cashout Points" />
      <MDBContainer fluid className="px-0 mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={4} xl={6} lg={4}>
            <AgentRequestCommission />
          </MDBCol>
          <MDBCol xxl={8} xl={6} lg={8}>
            <AgentCommissionStatus />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default SubCashoutPoints;
