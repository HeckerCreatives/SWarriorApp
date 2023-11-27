import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import AcctsListExport from "../../../../../components/dashboard/cards/acct-list-export";
import ModAcctListTable from "../../../../../components/dashboard/cards/tables/mod-acct-list";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const Accountants = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="USERS / Accountants" />
      <AcctsListExport />
      <ModAcctListTable />
    </MDBContainer>
  );
};

export default Accountants;
