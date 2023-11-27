import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import TransactionLogsTable from "../../../../../components/dashboard/cards/tables/transaction-logs";
import TransactionLogsFilter from "../../../../../components/dashboard/cards/transaction-logs-filter";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const AcctTransactionLogs = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="LOG BOOKS / Transaction Logs" />
      <TransactionLogsFilter />
      <TransactionLogsTable />
    </MDBContainer>
  );
};

export default AcctTransactionLogs;
