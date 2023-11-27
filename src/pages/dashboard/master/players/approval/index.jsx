import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import PlayersApprovalHeader from "../../../../../components/dashboard/cards/players/header/approval";
import PlayerApprovalTable from "../../../../../components/dashboard/cards/players/tables/approval";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const MasterPlayersApproval = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="PLAYERS / Approval Players" />
      <MDBContainer fluid className="px-0 mt-2">
        <PlayersApprovalHeader />
        <PlayerApprovalTable />
      </MDBContainer>
    </MDBContainer>
  );
};

export default MasterPlayersApproval;
