import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import CommsByDateCard from "../../../../../components/dashboard/cards/comms-by-date";
import CommsByDateHeader from "../../../../../components/dashboard/cards/comms-by-date-header";
import CommsByDateTable from "../../../../../components/dashboard/cards/tables/comms-by-date";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const SubCommissionsByDate = () => {
  return (
    <MDBContainer fluid className="px-0 pb-3 dashboard-bg">
      <DashboardTopNavigation title="COMMISSIONS / Commission By Date" />
      <MDBRow className="mx-0">
        <CommsByDateCard
          title="Regular Commissions"
          sub="This is the Commission Earned from Meron / Wala Bets"
          icon="box"
          value="0.00"
        />
        <CommsByDateCard
          title="Draw Commissions"
          sub="This is Commission Earned from Draw Bets"
          icon="box-open"
          value="0.00"
        />
        <CommsByDateCard
          title="Gross Commissions"
          sub="This is the sum of Regular and Draw Commission"
          icon="gem"
          value="0.00"
        />
        <CommsByDateCard
          title="Company Commissions"
          sub="Net Company Commission"
          icon="building"
          value="0.00"
        />
        <CommsByDateCard
          title="Agent Commissions"
          sub="Agent Commission from Player Bets"
          icon="user-tie"
          value="0.00"
        />
        <CommsByDateCard
          title="Pagcor Commissions"
          sub="Pagcor Commission Share"
          icon="user-plus"
          value="0.00"
        />
      </MDBRow>
      <CommsByDateHeader />
      <CommsByDateTable />
    </MDBContainer>
  );
};

export default SubCommissionsByDate;
