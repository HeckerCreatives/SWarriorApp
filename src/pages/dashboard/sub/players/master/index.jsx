import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import AgentMasterListHeader from "../../../../../components/dashboard/cards/agent-master-list-header";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import SubAgentMasterListTable from "../../../../../components/dashboard/cards/tables/sub-agent-master-list";

const MasterAgents = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="AGENTS / Master Agent" />
      <AgentMasterListHeader />
      <SubAgentMasterListTable />
    </MDBContainer>
  );
};

export default MasterAgents;
