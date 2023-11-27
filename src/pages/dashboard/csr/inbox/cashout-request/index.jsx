import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CashoutRequestFilter from "../../../../../components/dashboard/cards/cashout-req-filter";
import CashoutRequestTable from "../../../../../components/dashboard/cards/tables/cashout-request";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const CSRCashoutRequest = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="INBOX / Cashout Requests" />
      <CashoutRequestFilter />
      <CashoutRequestTable />
    </MDBContainer>
  );
};

export default CSRCashoutRequest;
