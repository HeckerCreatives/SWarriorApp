import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import AgentFinListHeader from "../../../../../components/dashboard/cards/agent-fin-list-header";
import AgentFinListTable from "../../../../../components/dashboard/cards/tables/agent-fin-list";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
 
const Financers = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="AGENTS / Financer" />
      <AgentFinListHeader />
      <AgentFinListTable />
    </MDBContainer>
  );
};

export default Financers;
