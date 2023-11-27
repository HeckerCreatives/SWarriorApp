import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import AgentsTransferPointsForm from "../../../../../components/dashboard/cards/points/transfer/form";
import AgentTransferPointsLogs from "../../../../../components/dashboard/cards/points/transfer/logs";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const MasterTransferPoints = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="MY ACCOUNT / Tranfer Points" />
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

export default MasterTransferPoints;
