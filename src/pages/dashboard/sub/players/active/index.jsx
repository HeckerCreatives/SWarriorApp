import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import PlayersActiveHeader from "../../../../../components/dashboard/cards/players/header/active";
import PlayerActiveTable from "../../../../../components/dashboard/cards/players/tables/active";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const SubActivePlayers = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="PLAYERS / Active Players" />
      <MDBContainer fluid className="px-0 mt-2">
        <PlayersActiveHeader />
        <PlayerActiveTable />
      </MDBContainer>
    </MDBContainer>
  );
};

export default SubActivePlayers;
