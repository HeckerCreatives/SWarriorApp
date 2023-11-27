import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import ArenaCommissionsHeader from "../../../../../components/dashboard/cards/arena-comms-header";
import ArenaCommissionsTable from "../../../../../components/dashboard/cards/tables/arena-comms";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const ArenaCommissions = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="COMMISSIONS / Arena Commissions" />
      <ArenaCommissionsHeader />
      <ArenaCommissionsTable />
    </MDBContainer>
  );
};

export default ArenaCommissions;
