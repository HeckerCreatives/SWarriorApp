import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CommissionRequestFilter from "../../../../../components/dashboard/cards/comms-req-filter";
import CommissionRequestTable from "../../../../../components/dashboard/cards/tables/comms-request";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const CSRCommissionsRequest = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="INBOX / Commission Requests" />
      <CommissionRequestFilter />
      <CommissionRequestTable />
    </MDBContainer>
  );
};

export default CSRCommissionsRequest;
