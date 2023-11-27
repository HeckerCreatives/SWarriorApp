import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CommissionRequestFilter from "../../../../../components/dashboard/cards/comms-req-filter";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import AgentCommissionRequestTable from "../../../../../components/dashboard/cards/tables/agent-comms-request";

const FinCommissionsRequest = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="INBOX / Commission Requests" />
      <CommissionRequestFilter />
      <AgentCommissionRequestTable />
    </MDBContainer>
  );
};

export default FinCommissionsRequest;
