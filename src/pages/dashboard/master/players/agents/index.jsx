import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import GoldListHeader from "../../../../../components/dashboard/cards/agent-gold-list-header";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import MasterAgentGoldListTable from "../../../../../components/dashboard/cards/tables/master-agent-gold-list";

const MasterAgents = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="PLAYERS / Agents" />
      <MDBContainer fluid className="px-0 mt-2">
        <GoldListHeader />
        <MasterAgentGoldListTable />
      </MDBContainer>
    </MDBContainer>
  );
};

export default MasterAgents;
