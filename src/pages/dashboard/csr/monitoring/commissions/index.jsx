import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import TopCommsHeader from "../../../../../components/dashboard/cards/top-comms-header";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import TopPointsTable from "../../../../../components/dashboard/cards/tables/top-commissions";

const CSRTopCommissions = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="MONITORING / Top Commissions" />
      <TopCommsHeader />
      <TopPointsTable />
    </MDBContainer>
  );
};

export default CSRTopCommissions;
