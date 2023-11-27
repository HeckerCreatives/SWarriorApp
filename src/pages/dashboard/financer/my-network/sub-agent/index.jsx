import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import AgentSubListHeader from "../../../../../components/dashboard/cards/agent-sub-list-header";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import FinancerAgentSubListTable from "../../../../../components/dashboard/cards/tables/fin-agent-sub-list";

const FinMasterAgent = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="AGENTS / Master Agent" />
      <AgentSubListHeader />
      <FinancerAgentSubListTable />
    </MDBContainer>
  );
};

export default FinMasterAgent;
