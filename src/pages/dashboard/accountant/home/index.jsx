import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import StatusCardMedium from "../../../../components/dashboard/cards/status/medium";
import StatusCardSmall from "../../../../components/dashboard/cards/status/small";
import DatedStatusTable from "../../../../components/dashboard/cards/tables/dated-status";
import OtherStatusTable from "../../../../components/dashboard/cards/tables/other-status";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";
import useDashboardStore from "../../../../stores/dashboardStore";
import { useEffect } from "react";

const AccountantDashboard = () => {
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

  useEffect(() => {
    getCompanyComms();
    getAgentTotalComms();
    getAgentTotalCredits();
    getPlayerTotalCredits();
    getTotalConverted();
  }, []);

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="DASHBOARD" />
      <MDBContainer fluid className="px-0 su-first-row">
        <MDBContainer>
          <MDBRow className="mx-0">
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
            <StatusCardSmall title="Draw Earnings" value={1} />
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
      <MDBContainer fluid className="px-0 my-3">
        <MDBContainer className="px-0 py-4">
          <MDBRow className="mx-0">
            <StatusCardMedium title="Draw Earnings" value={1} />
            <StatusCardMedium title="Company Daily Commission" value={1} />
            <StatusCardMedium title="Agent Daily Commissions" value={1} />
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
      <MDBContainer fluid className="px-0 su-third-row">
        <MDBContainer className="px-0">
          <MDBRow className="mx-0 h-100">
            {/* <DatedStatusTable /> */}
            <DatedStatusTable
              regularCommsCurrent={1}
              regularCommsLast={1}
              drawCommsCurrent={1}
              drawCommsLast={1}
              agentCommsCurrent={1}
              agentCommsLast={1}
              companyCommsCurrent={1}
              companyCommsLast={1}
            />
            <OtherStatusTable
              systemPoints={1}
              activePlayers={1}
              activeAgents={1}
              cashIns={1}
              cashOut={1}
              blockedUsers={1}
            />
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  );
};

export default AccountantDashboard;
