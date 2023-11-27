import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CsrListExport from "../../../../../components/dashboard/cards/csr-list-export";
import ModCsrListTable from "../../../../../components/dashboard/cards/tables/mod-csr-list";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const CSRs = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="USERS / CSR's" />
      <CsrListExport />
      <ModCsrListTable />
    </MDBContainer>
  );
};

export default CSRs;
