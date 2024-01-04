// ** Third Party Components
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

// ** Utils
import { sumArray } from "../../../../../utility/utils";

// ** Components
import CommsByDateCard from "../../../../../components/dashboard/cards/comms-by-date";
import CommsByDateHeader from "../../../../../components/dashboard/cards/comms-by-date-header";
import CommsByDateTable from "../../../../../components/dashboard/cards/tables/comms-by-date";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import useDashboardStore from "../../../../../stores/dashboardStore";
import { useEffect } from "react";
import useCommissionHistoryStore from "../../../../../stores/commissionHistoryStore";

const CommssionByDate = () => {
  const getCompanyComms = useDashboardStore(state => state.getCompanyComms);
  const companyComms = useDashboardStore(state => state.companyComms);
  const compCommsLoads = useDashboardStore(state => state.loading.companyComms);

  const getAgentTotalComms = useDashboardStore(state => state.getTotalComms);
  const gatcLoads = useDashboardStore(state => state.loading.totalComms);
  const agentTotalComms = useDashboardStore(state => state.totalComms);

  const getCommissionData = useCommissionHistoryStore(
    state => state.getCommissionData
  );
  const dashboardLoads = useCommissionHistoryStore(
    state => state.loading.dashboard
  );
  const regular = useCommissionHistoryStore(state => state.dashboard.regular);
  const draw = useCommissionHistoryStore(state => state.dashboard.draw);
  const gross = useCommissionHistoryStore(state => state.dashboard.gross);

  useEffect(() => {
    getCompanyComms();
    getAgentTotalComms();
    getCommissionData();
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
          value={handleNumber(regular)}
          loading={dashboardLoads}
        />
        <CommsByDateCard
          title="Draw Commissions"
          sub="This is Commission Earned from Draw Bets"
          icon="box-open"
          value={handleNumber(draw)}
          loading={dashboardLoads}
        />
        <CommsByDateCard
          title="Gross Commissions"
          sub="This is the sum of Regular and Draw Commission"
          icon="gem"
          value={handleNumber(gross)}
          loading={dashboardLoads}
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

export default CommssionByDate;
