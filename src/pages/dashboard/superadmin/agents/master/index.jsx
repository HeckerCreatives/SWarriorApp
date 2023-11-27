import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import AgentMasterListHeader from "../../../../../components/dashboard/cards/agent-master-list-header";
import AgentMasterListTable from "../../../../../components/dashboard/cards/tables/agent-master-list";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const MasterAgents = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="AGENTS / Master Agent" />
      <AgentMasterListHeader />
      <AgentMasterListTable />
    </MDBContainer>
  );
};

export default MasterAgents;
