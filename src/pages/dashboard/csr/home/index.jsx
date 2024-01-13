// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

// ** Components
import AgentsTransferPointsForm from "../../../../components/dashboard/cards/points/csr-transfer/form";
import AgentTransferPointsLogs from "../../../../components/dashboard/cards/points/transfer/logs";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";
import WelcomeUser from "../../../../components/dashboard/WelcomeUser";

const CSRDashboard = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="DASHBOARD" />
      <WelcomeUser />
      <MDBContainer fluid className="px-0 mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={4} xl={6} lg={6}>
            <AgentsTransferPointsForm />
          </MDBCol>
          <MDBCol xxl={8} xl={6} lg={6}>
            <AgentTransferPointsLogs />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default CSRDashboard;
