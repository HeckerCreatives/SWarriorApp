import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import PlayersDeactivatedHeader from "../../../../../components/dashboard/cards/players/header/deactivated";
import PlayerDeactivatedTable from "../../../../../components/dashboard/cards/players/tables/deactivated";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const MasterDeactivatedPlayers = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="PLAYERS / Deactivated" />
      <MDBContainer fluid className="px-0 mt-2">
        <PlayersDeactivatedHeader />
        <PlayerDeactivatedTable />
      </MDBContainer>
    </MDBContainer>
  );
};

export default MasterDeactivatedPlayers;
