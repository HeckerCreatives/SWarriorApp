import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import AmountTableList from "../../../../components/dashboard/cards/agents/amount-list-table";
import CommissionWalletCard from "../../../../components/dashboard/cards/agents/commission-wallet-card";
import CurrentWalletCard from "../../../../components/dashboard/cards/agents/current-wallet-card";
import AgentReferralCard from "../../../../components/dashboard/cards/agents/referral-card";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";
import CommissionsTableList from "../../../../components/dashboard/cards/agents/recieved-commission-table";
import useUserStore from "../../../../stores/userStore";
import WelcomeUser from "../../../../components/dashboard/WelcomeUser";

const GoldDashboard = () => {
  const getOwnPoints = useUserStore(state => state.getCreditOwned);
  const pointsOwned = useUserStore(state => state.points);
  const pointLoads = useUserStore(state => state.loading.points);

  const getOwnCommissions = useUserStore(state => state.getCommissionOwned);
  const commsOwned = useUserStore(state => state.commission);
  const commsLoads = useUserStore(state => state.loading.commission);

  useEffect(() => {
    getOwnCommissions();
    getOwnPoints();
  }, []);

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="DASHBOARD" />
      <WelcomeUser />
      <MDBContainer fluid className="mt-2">
        <AgentReferralCard to="PLAYER" />
        <MDBRow className="mt-3">
          <CurrentWalletCard
            title="Current Wallet"
            points={handleNumber(pointsOwned)}
            icon="wallet"
            loading={pointLoads}
          />
          <CommissionWalletCard
            title="Commission Wallet"
            points={handleNumber(commsOwned)}
            icon="percent"
            loading={commsLoads}
          />
        </MDBRow>
        <MDBRow className="mt-3">
          <CommissionsTableList />
          <AmountTableList />
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default GoldDashboard;
