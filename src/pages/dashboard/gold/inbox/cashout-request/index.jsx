import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CashoutRequestFilter from "../../../../../components/dashboard/cards/cashout-req-filter";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import AgentCashoutRequestTable from "../../../../../components/dashboard/cards/tables/agent-cashout-request";

const FinCashoutRequest = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="INBOX / Cashout Requests" />
      <CashoutRequestFilter />
      <AgentCashoutRequestTable />
    </MDBContainer>
  );
};

export default FinCashoutRequest;
