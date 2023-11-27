import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import PlayersListExport from "../../../../../components/dashboard/cards/players-list-export";
import ModPlayerListTable from "../../../../../components/dashboard/cards/tables/mod-player-list";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const CSRPlayers = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="USERS / Players/Cashiers" />
      <PlayersListExport />
      <ModPlayerListTable />
    </MDBContainer>
  );
};

export default CSRPlayers;
