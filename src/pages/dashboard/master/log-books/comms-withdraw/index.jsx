import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CommsWithdrawalLogsFilter from "../../../../../components/dashboard/cards/comms-withdraw-filter";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import AgentCommsWithdrawalLogsTable from "../../../../../components/dashboard/cards/tables/agent-comms-withdrawal-logs";

const MasterCommissionsWithdraw = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="LOG BOOKS / Commission Withdrawal Logs" />
      <CommsWithdrawalLogsFilter />
      <AgentCommsWithdrawalLogsTable />
    </MDBContainer>
  );
};

export default MasterCommissionsWithdraw;
