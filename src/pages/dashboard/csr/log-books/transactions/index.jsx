import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import AgentTransactionLogsTable from "../../../../../components/dashboard/cards/tables/agent-transaction-logs";
import TransactionLogsFilter from "../../../../../components/dashboard/cards/transaction-logs-filter";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const CSRTransactionLogs = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="LOG BOOKS / Transaction Logs" />
      <TransactionLogsFilter />
      <AgentTransactionLogsTable />
    </MDBContainer>
  );
};

export default CSRTransactionLogs;
