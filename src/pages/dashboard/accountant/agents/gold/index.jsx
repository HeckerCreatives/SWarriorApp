import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import AgentGoldListHeader from "../../../../../components/dashboard/cards/agent-gold-list-header";
import AgentGoldListTable from "../../../../../components/dashboard/cards/tables/agent-gold-list";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const AcctGoldAgent = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="AGENTS / Gold Agent" />
      <AgentGoldListHeader />
      <AgentGoldListTable />
    </MDBContainer>
  );
};

export default AcctGoldAgent;
