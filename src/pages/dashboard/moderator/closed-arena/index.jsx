import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import ClosedArenaHeader from "../../../../components/dashboard/cards/close-arena-header";
import ClosedArenasTable from "../../../../components/dashboard/cards/tables/closed-arenas";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";

const ModClosedArena = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="ARENA MODERATOR / Closed Arenas" />
      <ClosedArenaHeader />
      <ClosedArenasTable />
    </MDBContainer>
  );
};

export default ModClosedArena;
