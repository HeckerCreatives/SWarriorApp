import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import BettingLogsFilter from "../../../../../components/dashboard/cards/betting-logs-filter";
import BettingLogsTable from "../../../../../components/dashboard/cards/tables/betting-logs";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const AcctBettingLogs = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="LOG BOOKS / Betting Logs" />
      <BettingLogsFilter />
      <BettingLogsTable />
    </MDBContainer>
  );
};

export default AcctBettingLogs;
