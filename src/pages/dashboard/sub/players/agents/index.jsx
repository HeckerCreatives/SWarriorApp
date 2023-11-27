import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import PlayersAgentHeader from "../../../../../components/dashboard/cards/players/header/agent";
import PlayerAgentsTable from "../../../../../components/dashboard/cards/players/tables/agent";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const SubAgents = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="PLAYERS / Agents" />
      <MDBContainer fluid className="px-0 mt-2">
        <PlayersAgentHeader />
        <PlayerAgentsTable />
      </MDBContainer>
    </MDBContainer>
  );
};

export default SubAgents;
