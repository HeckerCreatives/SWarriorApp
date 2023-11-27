import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import LoginLogsFilter from "../../../../../components/dashboard/cards/login-logs-filter";
import LoginLogsTable from "../../../../../components/dashboard/cards/tables/login-logs";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const CSRLoginLogs = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="LOG BOOKS / Login Logs" />
      <LoginLogsFilter />
      <LoginLogsTable />
    </MDBContainer>
  );
};

export default CSRLoginLogs;
