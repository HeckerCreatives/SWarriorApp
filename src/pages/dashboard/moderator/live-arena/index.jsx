import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import LiveArenasCreate from "../../../../components/dashboard/cards/live-arena-create";
import LiveArenasTable from "../../../../components/dashboard/cards/tables/live-arenas";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";

const ModLiveArena = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="ARENA MODERATOR / Live Arenas" />
      <LiveArenasCreate />
      <LiveArenasTable />
    </MDBContainer>
  );
};

export default ModLiveArena;
