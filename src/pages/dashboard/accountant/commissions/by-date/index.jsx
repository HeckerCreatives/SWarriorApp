import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import CommsByDateCard from "../../../../../components/dashboard/cards/comms-by-date";
import CommsByDateHeader from "../../../../../components/dashboard/cards/comms-by-date-header";
import CommsByDateTable from "../../../../../components/dashboard/cards/tables/comms-by-date";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import useDashboardStore from "../../../../../stores/dashboardStore";
import { useEffect } from "react";

const AcctCommissionsByDate = () => {
  const getCompanyComms = useDashboardStore(state => state.getCompanyComms);
  const companyComms = useDashboardStore(state => state.companyComms);
  const compCommsLoads = useDashboardStore(state => state.loading.companyComms);

  const getAgentTotalComms = useDashboardStore(state => state.getTotalComms);
  const gatcLoads = useDashboardStore(state => state.loading.totalComms);
  const agentTotalComms = useDashboardStore(state => state.totalComms);

  useEffect(() => {
    getCompanyComms();
    getAgentTotalComms();
  }, []);

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <MDBContainer fluid className="px-0 pb-3 dashboard-bg">
      <DashboardTopNavigation title="COMMISSIONS / Commission By Date" />
      <MDBRow className="mx-0">
        <CommsByDateCard
          xxl={6}
          xl={6}
          lg={8}
          md={8}
          sm={12}
          size={12}
          title="Company Commissions"
          sub="Net Company Commission"
          icon="building"
          value={handleNumber(companyComms)}
          loading={compCommsLoads}
        />

        <CommsByDateCard
          title="Regular Commissions"
          sub="This is the Commission Earned from Meron / Wala Bets"
          icon="box"
          value={1}
        />
        <CommsByDateCard
          title="Draw Commissions"
          sub="This is Commission Earned from Draw Bets"
          icon="box-open"
          value={0}
        />
        <CommsByDateCard
          title="Gross Commissions"
          sub="This is the sum of Regular and Draw Commission"
          icon="gem"
          value={1}
        />

        <CommsByDateCard
          title="Agent Commissions"
          sub="Agent Commission from Player Bets"
          icon="user-tie"
          value={handleNumber(agentTotalComms)}
          loading={gatcLoads}
        />
      </MDBRow>
      <CommsByDateHeader />
      <CommsByDateTable />
    </MDBContainer>
  );
};

export default AcctCommissionsByDate;
