import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CommsWithdrawalLogsFilter from "../../../../../components/dashboard/cards/comms-withdraw-filter";
import CommsWithdrawalLogsTable from "../../../../../components/dashboard/cards/tables/comms-withdrawal-logs";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const CSRCommissionsWithdraw = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="LOG BOOKS / Commission Withdrawal Logs" />
      <CommsWithdrawalLogsFilter />
      <CommsWithdrawalLogsTable />
    </MDBContainer>
  );
};

export default CSRCommissionsWithdraw;
