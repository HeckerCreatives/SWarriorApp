import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CashoutLogsFilter from "../../../../../components/dashboard/cards/cashout-logs-filter";
import CashoutLogsTable from "../../../../../components/dashboard/cards/tables/cashout-logs";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const AcctCashoutLogs = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="LOG BOOKS / Cashout Logs" />
      <CashoutLogsFilter />
      <CashoutLogsTable />
    </MDBContainer>
  );
};

export default AcctCashoutLogs;
