import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import ModUserListTable from "../../../../../components/dashboard/cards/tables/mod-user-list";
import UsersListExport from "../../../../../components/dashboard/cards/user-list-export";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const Moderators = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="USERS / Moderator/Declarator" />
      <UsersListExport />
      <ModUserListTable />
    </MDBContainer>
  );
};

export default Moderators;
