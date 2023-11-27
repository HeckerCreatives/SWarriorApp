import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import TopPointsTable from "../../../../../components/dashboard/cards/tables/top-points";
import TopPointsHeader from "../../../../../components/dashboard/cards/top-points-header";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const CSRTopPoints = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="MONITORING / Top Points" />
      <TopPointsHeader />
      <TopPointsTable />
    </MDBContainer>
  );
};

export default CSRTopPoints;
