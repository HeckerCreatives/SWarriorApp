import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CashoutLogsFilter from "../../../../../components/dashboard/cards/cashout-logs-filter";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import AgentCashoutLogsTable from "../../../../../components/dashboard/cards/tables/agent-cashout-logs";

const FinCashoutLogs = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="LOG BOOKS / Cashout Logs" />
      <CashoutLogsFilter />
      <AgentCashoutLogsTable />
    </MDBContainer>
  );
};

export default FinCashoutLogs;
