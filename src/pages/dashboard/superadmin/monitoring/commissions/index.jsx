import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";

// ** Components
import TopPointsTable from "../../../../../components/dashboard/cards/tables/top-commissions";
import TopCommsHeader from "../../../../../components/dashboard/cards/top-comms-header";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const TopCommissions = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="MONITORING / Top Commissions" />
      <TopCommsHeader />
      <TopPointsTable />
    </MDBContainer>
  );
};

export default TopCommissions;
