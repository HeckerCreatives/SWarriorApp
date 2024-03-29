// ** React Imports
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

import "./index.css";

import AvailablePoints from "../../../../components/dashboard/cards/available-points";
import StatusCardMedium from "../../../../components/dashboard/cards/status/medium";
import StatusCardSmall from "../../../../components/dashboard/cards/status/small";
import DatedStatusTable from "../../../../components/dashboard/cards/tables/dated-status";
import OtherStatusTable from "../../../../components/dashboard/cards/tables/other-status";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";
import useUserStore from "../../../../stores/userStore";
import useDashboardStore from "../../../../stores/dashboardStore";
import WelcomeUser from "../../../../components/dashboard/WelcomeUser";

const SuperAdminDashboard = () => {
  const getOwnPoints = useUserStore(state => state.getCreditOwned);
  const pointsOwned = useUserStore(state => state.points);
  const ownLoads = useUserStore(state => state.loading.points);

  const getCompanyComms = useDashboardStore(state => state.getCompanyComms);
  const companyComms = useDashboardStore(state => state.companyComms);
  const compCommsLoads = useDashboardStore(state => state.loading.companyComms);

  const getAgentTotalComms = useDashboardStore(state => state.getTotalComms);
  const gatcLoads = useDashboardStore(state => state.loading.totalComms);
  const agentTotalComms = useDashboardStore(state => state.totalComms);

  const getAgentTotalCredits = useDashboardStore(
    state => state.getTotalCredits
  );
  const gatc2Loads = useDashboardStore(state => state.loading.totalCredits);
  const agentTotalCredits = useDashboardStore(state => state.totalCredits);

  const getPlayerTotalCredits = useDashboardStore(
    state => state.getPlayerTotalCredits
  );
  const gptcLoads = useDashboardStore(state => state.loading.playerTotalCreds);
  const playerTotalCredits = useDashboardStore(state => state.playerTotalCreds);

  const getTotalConverted = useDashboardStore(state => state.getTotalConverted);
  const gtcdLoads = useDashboardStore(state => state.loading.convertedComms);
  const totalConvertedComms = useDashboardStore(state => state.convertedComms);

  const getTotalDrawEarnings = useDashboardStore(
    state => state.getTotalDrawEarnings
  );
  const gtdeLoads = useDashboardStore(state => state.loading.totalDrawEarnings);
  const totalDrawEarnings = useDashboardStore(state => state.totalDrawEarnings);

  const getDailyDrawEarnings = useDashboardStore(
    state => state.getDailyDrawEarnings
  );
  const gddeLoads = useDashboardStore(state => state.loading.dailyDrawEarnings);
  const dailyDrawEarnings = useDashboardStore(state => state.dailyDrawEarnings);

  const getCompanyDailyComms = useDashboardStore(
    state => state.getCompanyDailyComms
  );
  const gcdcLoads = useDashboardStore(state => state.loading.dailyCompanyComms);
  const dailyCompanyComms = useDashboardStore(state => state.dailyCompanyComms);

  const getAgentDailyComms = useDashboardStore(
    state => state.getAgentDailyComms
  );
  const gadcLoads = useDashboardStore(state => state.loading.dailyAgentComms);
  const dailyAgentComms = useDashboardStore(state => state.dailyAgentComms);

  useEffect(() => {
    getCompanyComms();
    getOwnPoints();
    getAgentTotalComms();
    getAgentTotalCredits();
    getPlayerTotalCredits();
    getTotalConverted();
    getTotalDrawEarnings();
    getDailyDrawEarnings();
    getCompanyDailyComms();
    getAgentDailyComms();
  }, []);

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="DASHBOARD" />
      <WelcomeUser />
      <MDBContainer fluid className="px-0 su-first-row">
        <MDBContainer>
          <MDBRow className="mx-0">
            <AvailablePoints
              value={handleNumber(pointsOwned)}
              loading={ownLoads}
            />
            <StatusCardSmall
              title="Company Commissions"
              value={handleNumber(companyComms)}
              loading={compCommsLoads}
            />
            <StatusCardSmall
              title="Agent Available Commissions"
              value={handleNumber(agentTotalComms)}
              loading={gatcLoads}
            />
            <StatusCardSmall
              title="Total Agent Points"
              value={handleNumber(agentTotalCredits)}
              loading={gatc2Loads}
            />
            <StatusCardSmall
              title="Agents Converted Commissions"
              value={handleNumber(totalConvertedComms)}
              loading={gtcdLoads}
            />
            <StatusCardSmall
              title="Total Players Points"
              value={handleNumber(playerTotalCredits)}
              loading={gptcLoads}
            />
            <StatusCardSmall
              title="Draw Earnings"
              value={handleNumber(totalDrawEarnings)}
              loading={gtdeLoads}
            />
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
      <MDBContainer fluid className="px-0 my-3 su-second-row">
        <MDBContainer className="px-0 py-4">
          <MDBRow className="mx-0">
            <StatusCardMedium
              title="Daily Draw Earnings"
              value={handleNumber(dailyDrawEarnings)}
              loading={gddeLoads}
            />
            <StatusCardMedium
              title="Company Daily Commission"
              value={handleNumber(dailyCompanyComms)}
              loading={gcdcLoads}
            />
            <StatusCardMedium
              title="Agent Daily Commissions"
              value={handleNumber(dailyAgentComms)}
              loading={gadcLoads}
            />
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
      <MDBContainer fluid className="px-0 su-third-row">
        <MDBContainer className="px-0">
          <MDBRow className="mx-0 h-100">
            <DatedStatusTable />
            <OtherStatusTable />
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  );
};

export default SuperAdminDashboard;
