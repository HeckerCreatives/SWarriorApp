// ** React
import React from "react";
import { Route, Routes } from "react-router-dom";

// ** Utils
import RequireAuth from "./utility/RequireAuth";

// Main Routes
import Dashboard from "./pages/dashboard";
import Homepage from "./pages/home";
import Arena from "./components/arena";
import ArenaList from "./components/arenaList";

// Public Routes
import Login from "./pages/sessions/login";
import Register from "./pages/sessions/register";

// SuperAdmin
import ArenaAdmin from "./components/arenaAdmin";
import SuperAdminDashboard from "./pages/dashboard/superadmin/home";
import CashoutRequest from "./pages/dashboard/superadmin/inbox/cashout";
import CommissionRequest from "./pages/dashboard/superadmin/inbox/commission";
import LiveArena from "./pages/dashboard/superadmin/arena-mod/live";
import ClosedArena from "./pages/dashboard/superadmin/arena-mod/closed";
import CreateArena from "./pages/dashboard/superadmin/arena-mod/create";
import VideoMonitoring from "./pages/dashboard/superadmin/arena-mod/monitoring";
// import ArenaCommissions from "./pages/dashboard/superadmin/commissions/arena";
import CommissionsByDate from "./pages/dashboard/superadmin/commissions/by-date";
import TopPoints from "./pages/dashboard/superadmin/monitoring/points";
import TopCommissions from "./pages/dashboard/superadmin/monitoring/commissions";
import Moderators from "./pages/dashboard/superadmin/users/moderator";
import Accountants from "./pages/dashboard/superadmin/users/accountant";
import CSRs from "./pages/dashboard/superadmin/users/csr";
import Players from "./pages/dashboard/superadmin/users/players";
import Financers from "./pages/dashboard/superadmin/agents/financer";
import MasterAgents from "./pages/dashboard/superadmin/agents/master";
import GoldAgents from "./pages/dashboard/superadmin/agents/gold";
import SubAgents from "./pages/dashboard/superadmin/agents/sub";
import TransactionLogs from "./pages/dashboard/superadmin/logs/transaction";
import BettingLogs from "./pages/dashboard/superadmin/logs/betting";
import LoginLogs from "./pages/dashboard/superadmin/logs/login";
import CashoutLogs from "./pages/dashboard/superadmin/logs/cashout";
import CommissionsWithdraw from "./pages/dashboard/superadmin/logs/comms-withdraw";
import SiteSettings from "./pages/dashboard/superadmin/superadmin/site-settings";
import VarianceCheck from "./pages/dashboard/superadmin/superadmin/variance-check";
import OnlineUsers from "./pages/dashboard/superadmin/superadmin/online-users";
import GlobalAnnouncements from "./pages/dashboard/superadmin/superadmin/global-announcements";
import TransferPoints from "./pages/dashboard/superadmin/superadmin/transfer-points";
import CreateUserAccount from "./pages/dashboard/superadmin/superadmin/create-user";
import RefferalTree from "./pages/dashboard/superadmin/superadmin/refferalTree";
// Moderator
import ModLiveArena from "./pages/dashboard/moderator/live-arena";
import ModClosedArena from "./pages/dashboard/moderator/closed-arena";
import ModCreateVideos from "./pages/dashboard/moderator/create-videos";
import ModVideoMonitoring from "./pages/dashboard/moderator/video-monitoring";

// Accountant
import AccountantDashboard from "./pages/dashboard/accountant/home";
import AcctCashoutRequest from "./pages/dashboard/accountant/inbox/cashout-request";
import AcctCommissionsRequest from "./pages/dashboard/accountant/inbox/comms-request";
import AcctArenaCommissions from "./pages/dashboard/accountant/commissions/arena";
import AcctCommissionsByDate from "./pages/dashboard/accountant/commissions/by-date";
import AcctTopPoints from "./pages/dashboard/accountant/monitoring/points";
import AcctTopCommissions from "./pages/dashboard/accountant/monitoring/commissions";
import AcctSuperAgent from "./pages/dashboard/accountant/agents/super";
import AcctMasterAgent from "./pages/dashboard/accountant/agents/master";
import AcctGoldAgent from "./pages/dashboard/accountant/agents/gold";
import AcctSubAgent from "./pages/dashboard/accountant/agents/sub";
import AcctTransactionLogs from "./pages/dashboard/accountant/log-books/transactions";
import AcctBettingLogs from "./pages/dashboard/accountant/log-books/bettings";
import AcctLoginLogs from "./pages/dashboard/accountant/log-books/login";
import AcctCashoutLogs from "./pages/dashboard/accountant/log-books/cashout";
import AcctCommisionsWithdraw from "./pages/dashboard/accountant/log-books/comms-withdraw";

// CSR
import CSRDashboard from "./pages/dashboard/csr/home";
import CSRCashoutRequest from "./pages/dashboard/csr/inbox/cashout-request";
import CSRCommissionsrequest from "./pages/dashboard/csr/inbox/comms-request";
// import CSRTopPoints from "./pages/dashboard/csr/monitoring/points";
// import CSRTopCommissions from "./pages/dashboard/csr/monitoring/commissions";
import CSRPlayers from "./pages/dashboard/csr/users/players";
import CSRSuperAgent from "./pages/dashboard/csr/agents/super";
import CSRMasterAgent from "./pages/dashboard/csr/agents/master";
import CSRGoldAgent from "./pages/dashboard/csr/agents/gold";
import CSRSubAgent from "./pages/dashboard/csr/agents/sub";
import CSRTransactionLogs from "./pages/dashboard/csr/log-books/transactions";
import CSRBettingLogs from "./pages/dashboard/csr/log-books/bettings";
import CSRLoginLogs from "./pages/dashboard/csr/log-books/login";
import CSRCashoutLogs from "./pages/dashboard/csr/log-books/cashout";
import CSRCommissionsWithdraw from "./pages/dashboard/csr/log-books/comms-withdraw";

// Financer
import FinancerDashboard from "./pages/dashboard/financer/home";
import FinCashoutRequest from "./pages/dashboard/financer/inbox/cashout-request";
import FinCommissionsRequest from "./pages/dashboard/financer/inbox/comms-request";
import FinCommissionBreakdown from "./pages/dashboard/financer/commissions/breakdown";
import FinArenaCommissions from "./pages/dashboard/financer/commissions/arena";
import FinCommissionWithdraw from "./pages/dashboard/financer/commissions/withdraw";
import FinCashoutPoints from "./pages/dashboard/financer/my-account/cashout-points";
import FinRequestCommission from "./pages/dashboard/financer/my-account/request-commissions";
import FinEditProfile from "./pages/dashboard/financer/my-account/edit-profile";
import FinPaymentMode from "./pages/dashboard/financer/my-account/payment-mode";
import FinTransferPoints from "./pages/dashboard/financer/my-account/transfer-points";
import FinSubAgent from "./pages/dashboard/financer/my-network/sub-agent";
import FinancerActivePlayers from "./pages/dashboard/financer/my-network/active";
import FinancerPlayersApproval from "./pages/dashboard/financer/my-network/approval";
import FinancerDeactivatedPlayers from "./pages/dashboard/financer/my-network/deactivated";
import FinCashoutLogs from "./pages/dashboard/financer/log-books/cashout";
import FinCommissionsWithdraw from "./pages/dashboard/financer/log-books/comms-withdraw";
import FinTransactionLogs from "./pages/dashboard/financer/log-books/transactions";
// import FinSettings from "./pages/dashboard/financer/settings";

// Master
import MasterDashboard from "./pages/dashboard/master/home";
import MasterCashoutRequest from "./pages/dashboard/master/inbox/cashout-request";
import MasterCommissionsRequest from "./pages/dashboard/master/inbox/comms-request";
import MasterArenaCommissions from "./pages/dashboard/master/commissions/arena";
import MasterCommissionsByDate from "./pages/dashboard/master/commissions/by-date";
import MasterTransferPoints from "./pages/dashboard/master/my-account/transfer-points";
import MasterCashoutPoints from "./pages/dashboard/master/my-account/cashout-points";
import MasterRequestCommission from "./pages/dashboard/master/my-account/request-commissions";
import MasterPaymentMode from "./pages/dashboard/master/my-account/payment-mode";
import MasterAgentList from "./pages/dashboard/master/players/agents";
import MasterActivePlayers from "./pages/dashboard/master/players/active";
import MasterPlayersApproval from "./pages/dashboard/master/players/approval";
import MasterDeactivatedPlayers from "./pages/dashboard/master/players/deactivated";
import MasterTransactionsLogs from "./pages/dashboard/master/log-books/transactions";
import MasterCashoutLogs from "./pages/dashboard/master/log-books/cashout";
import MasterCommissionsWithdraw from "./pages/dashboard/master/log-books/comms-withdraw";
// import MasterSettings from "./pages/dashboard/master/settings";

// Gold
import GoldDashboard from "./pages/dashboard/gold/home";
import GoldCashoutRequest from "./pages/dashboard/gold/inbox/cashout-request";
import GoldArenaCommissions from "./pages/dashboard/gold/commissions/arena";
import GoldCommissionsByDate from "./pages/dashboard/gold/commissions/by-date";
import GoldTransferPoints from "./pages/dashboard/gold/my-account/transfer-points";
import GoldCashoutPoints from "./pages/dashboard/gold/my-account/cashout-points";
import GoldRequestCommission from "./pages/dashboard/gold/my-account/request-commissions";
import GoldPaymentMode from "./pages/dashboard/gold/my-account/payment-mode";
import GoldAgentList from "./pages/dashboard/gold/players/agents";
import GoldActivePlayers from "./pages/dashboard/gold/players/active";
import GoldPlayersApproval from "./pages/dashboard/gold/players/approval";
import GoldDeactivatedPlayers from "./pages/dashboard/gold/players/deactivated";
import GoldTransactionsLogs from "./pages/dashboard/gold/log-books/transactions";
import GoldCashoutLogs from "./pages/dashboard/gold/log-books/cashout";
import GoldCommissionsWithdraw from "./pages/dashboard/gold/log-books/comms-withdraw";
// import GoldSettings from "./pages/dashboard/gold/settings";

//Sub
import SubDashboard from "./pages/dashboard/sub/home";
import SubCashoutRequest from "./pages/dashboard/sub/inbox/cashout-request";
import SubCommissionsRequest from "./pages/dashboard/sub/inbox/comms-request";
import SubArenaCommissions from "./pages/dashboard/sub/commissions/arena";
import SubCommissionsByDate from "./pages/dashboard/sub/commissions/by-date";
import SubTransferPoints from "./pages/dashboard/sub/my-account/transfer-points";
import SubCashoutPoints from "./pages/dashboard/sub/my-account/cashout-points";
import SubRequestCommission from "./pages/dashboard/sub/my-account/request-commissions";
// import SubPaymentMode from "./pages/dashboard/sub/my-account/payment-mode";
import SubAgentList from "./pages/dashboard/sub/players/agents";
import SubMasterAgent from "./pages/dashboard/sub/players/master";
import SubActivePlayers from "./pages/dashboard/sub/players/active";
import SubPlayersApproval from "./pages/dashboard/sub/players/approval";
import SubDeactivatedPlayers from "./pages/dashboard/sub/players/deactivated";
import SubTransactionsLogs from "./pages/dashboard/sub/log-books/transactions";
import SubCashoutLogs from "./pages/dashboard/sub/log-books/cashout";
import SubCommissionsWithdraw from "./pages/dashboard/sub/log-books/comms-withdraw";
// import SubSettings from "./pages/dashboard/sub/settings";

import NotFound from "./pages/other/404";
import Unauthorized from "./pages/other/unauthorized";

import { Navigate } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration/:uid/:type" element={<Register />} />

      <Route path="player" element={<RequireAuth allowedRoles={["player"]} />}>
        <Route path="arena" element={<Arena />} />
        <Route path="arenaList" element={<ArenaList />} />
      </Route>

      {/* SUPERADMIN & MODERATOR */}
      <Route
        path="admin"
        element={<RequireAuth allowedRoles={["superadmin", "moderator"]} />}
      >
        <Route path="arena" element={<ArenaAdmin />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        {/* SUPERADMIN */}
        <Route
          path="superadmin"
          element={<RequireAuth allowedRoles={["superadmin"]} />}
        >
          <Route path="home" element={<SuperAdminDashboard />} />
          <Route path="inbox">
            <Route path="cashout-request" element={<CashoutRequest />} />
            <Route path="commissions-request" element={<CommissionRequest />} />
          </Route>
          <Route path="arena-moderator">
            <Route path="live-arenas" element={<LiveArena />} />
            <Route path="closed-arena" element={<ClosedArena />} />
            <Route path="create-videos" element={<CreateArena />} />
            <Route path="video-monitoring" element={<VideoMonitoring />} />
          </Route>
          <Route path="commissions">
            {/* <Route path="arena-commissions" element={<ArenaCommissions />} /> */}
            <Route path="commission-by-date" element={<CommissionsByDate />} />
          </Route>
          <Route path="monitoring">
            <Route path="top-points" element={<TopPoints />} />
            <Route path="top-commissions" element={<TopCommissions />} />
          </Route>
          <Route path="users">
            <Route path="moderator" element={<Moderators />} />
            <Route path="accountants" element={<Accountants />} />
            <Route path="csr" element={<CSRs />} />
            <Route path="players" element={<Players />} />
          </Route>
          <Route path="agents">
            <Route path="financers" element={<Financers />} />
            <Route path="master" element={<MasterAgents />} />
            <Route path="gold" element={<GoldAgents />} />
            <Route path="sub" element={<SubAgents />} />
          </Route>
          <Route path="logs">
            <Route path="transaction" element={<TransactionLogs />} />
            <Route path="betting" element={<BettingLogs />} />
            <Route path="login" element={<LoginLogs />} />
            <Route path="cashout" element={<CashoutLogs />} />
            <Route
              path="commissions-withdraw"
              element={<CommissionsWithdraw />}
            />
          </Route>
          <Route path="settings">
            <Route path="site-settings" element={<SiteSettings />} />
            <Route path="variance-check" element={<VarianceCheck />} />
            <Route path="online-users" element={<OnlineUsers />} />
            <Route
              path="global-announcement"
              element={<GlobalAnnouncements />}
            />
            <Route path="transfer-points" element={<TransferPoints />} />
            <Route path="create-user" element={<CreateUserAccount />} />
            <Route path="refferalTree" element={<RefferalTree />} />
          </Route>
        </Route>

        {/* MODERATOR */}
        <Route
          path="moderator"
          element={<RequireAuth allowedRoles={["moderator"]} />}
        >
          <Route
            path="home"
            element={<Navigate to="/dashboard/moderator/live-arenas" />}
          />
          <Route path="live-arenas" element={<ModLiveArena />} />
          <Route path="closed-arenas" element={<ModClosedArena />} />
          <Route path="create-videos" element={<ModCreateVideos />} />
          <Route path="video-monitoring" element={<ModVideoMonitoring />} />
        </Route>

        {/* ACCOUNTANT */}
        <Route
          path="accountant"
          element={<RequireAuth allowedRoles={["accountant"]} />}
        >
          <Route path="home" element={<AccountantDashboard />} />
          <Route path="inbox">
            <Route path="cashout-request" element={<AcctCashoutRequest />} />
            <Route
              path="commission-request"
              element={<AcctCommissionsRequest />}
            />
          </Route>
          <Route path="commissions">
            <Route
              path="arena-commissions"
              element={<AcctArenaCommissions />}
            />
            <Route
              path="commissions-by-date"
              element={<AcctCommissionsByDate />}
            />
          </Route>
          <Route path="monitoring">
            <Route path="top-points" element={<AcctTopPoints />} />
            <Route path="top-commissions" element={<AcctTopCommissions />} />
          </Route>
          <Route path="agents">
            <Route path="financer" element={<AcctSuperAgent />} />
            <Route path="master" element={<AcctMasterAgent />} />
            <Route path="gold" element={<AcctGoldAgent />} />
            <Route path="sub" element={<AcctSubAgent />} />
          </Route>
          <Route path="logs">
            <Route path="transaction" element={<AcctTransactionLogs />} />
            <Route path="betting" element={<AcctBettingLogs />} />
            <Route path="login" element={<AcctLoginLogs />} />
            <Route path="cashout" element={<AcctCashoutLogs />} />
            <Route
              path="commissions-withdraw"
              element={<AcctCommisionsWithdraw />}
            />
          </Route>
        </Route>

        {/* CSR */}
        <Route path="csr" element={<RequireAuth allowedRoles={["csr"]} />}>
          {/* <Route
            path="home"
            element={<Navigate to="/dashboard/csr/inbox/cashout-request" />}
          /> */}

          <Route path="home" element={<CSRDashboard />} />
          <Route path="inbox">
            <Route path="cashout-request" element={<CSRCashoutRequest />} />
            <Route
              path="commission-request"
              element={<CSRCommissionsrequest />}
            />
          </Route>
          {/* <Route path="monitoring">
            <Route path="top-points" element={<CSRTopPoints />} />
            <Route path="top-commissions" element={<CSRTopCommissions />} />
          </Route> */}
          <Route path="users">
            <Route path="players" element={<CSRPlayers />} />
          </Route>
          <Route path="agents">
            <Route path="financer" element={<CSRSuperAgent />} />
            <Route path="master" element={<CSRMasterAgent />} />
            <Route path="gold" element={<CSRGoldAgent />} />
            <Route path="sub" element={<CSRSubAgent />} />
          </Route>
          <Route path="logs">
            <Route path="transaction" element={<CSRTransactionLogs />} />
            <Route path="betting" element={<CSRBettingLogs />} />
            <Route path="login" element={<CSRLoginLogs />} />
            <Route path="cashout" element={<CSRCashoutLogs />} />
            <Route
              path="commissions-withdraw"
              element={<CSRCommissionsWithdraw />}
            />
          </Route>
        </Route>

        {/* FINANCER */}
        <Route
          path="financer"
          element={<RequireAuth allowedRoles={["financer"]} />}
        >
          <Route path="home" element={<FinancerDashboard />} />
          <Route path="inbox">
            <Route path="cashout-request" element={<FinCashoutRequest />} />
            <Route
              path="commissions-request"
              element={<FinCommissionsRequest />}
            />
          </Route>
          <Route path="commissions">
            <Route path="breakdown" element={<FinCommissionBreakdown />} />
            <Route path="withdraw" element={<FinCommissionWithdraw />} />
            <Route path="arena" element={<FinArenaCommissions />} />
          </Route>
          <Route path="my-account">
            <Route path="transfer-points" element={<FinTransferPoints />} />
            <Route path="cashout-points" element={<FinCashoutPoints />} />
            <Route
              path="request-commissions"
              element={<FinRequestCommission />}
            />
            <Route path="payment-mode" element={<FinPaymentMode />} />
            <Route path="edit-profile" element={<FinEditProfile />} />
          </Route>
          <Route path="my-network">
            <Route path="sub-agent" element={<FinSubAgent />} />
            <Route path="active" element={<FinancerActivePlayers />} />
            <Route path="approval" element={<FinancerPlayersApproval />} />
            <Route
              path="deactivated"
              element={<FinancerDeactivatedPlayers />}
            />
          </Route>
          <Route path="logs">
            <Route path="transaction" element={<FinTransactionLogs />} />
            <Route path="cashout" element={<FinCashoutLogs />} />
            <Route
              path="commissions-withdraw"
              element={<FinCommissionsWithdraw />}
            />
          </Route>
          {/* <Route path="settings" element={<FinSettings />} /> */}
        </Route>

        {/* MASTER AGENT */}
        <Route
          path="master"
          element={<RequireAuth allowedRoles={["master"]} />}
        >
          <Route path="home" element={<MasterDashboard />} />
          <Route path="inbox">
            <Route path="cashout-request" element={<MasterCashoutRequest />} />
            <Route
              path="commissions-request"
              element={<MasterCommissionsRequest />}
            />
          </Route>
          <Route path="commissions">
            <Route path="arena" element={<MasterArenaCommissions />} />
            <Route path="by-date" element={<MasterCommissionsByDate />} />
          </Route>
          <Route path="my-account">
            <Route path="transfer-points" element={<MasterTransferPoints />} />
            <Route path="cashout-points" element={<MasterCashoutPoints />} />
            <Route
              path="request-commissions"
              element={<MasterRequestCommission />}
            />
            <Route path="payment-mode" element={<MasterPaymentMode />} />
          </Route>
          <Route path="players">
            <Route path="agents" element={<MasterAgentList />} />
            <Route path="active" element={<MasterActivePlayers />} />
            <Route path="approval" element={<MasterPlayersApproval />} />
            <Route path="deactivated" element={<MasterDeactivatedPlayers />} />
          </Route>
          <Route path="logs">
            <Route path="transaction" element={<MasterTransactionsLogs />} />
            <Route path="cashout" element={<MasterCashoutLogs />} />
            <Route
              path="commissions-withdraw"
              element={<MasterCommissionsWithdraw />}
            />
          </Route>
          {/* <Route path="settings" element={<MasterSettings />} /> */}
        </Route>

        {/* GOLD AGENT */}
        <Route path="gold" element={<RequireAuth allowedRoles={["gold"]} />}>
          <Route path="home" element={<GoldDashboard />} />
          <Route path="inbox">
            <Route path="cashout-request" element={<GoldCashoutRequest />} />
          </Route>
          <Route path="commissions">
            <Route path="arena" element={<GoldArenaCommissions />} />
            <Route path="by-date" element={<GoldCommissionsByDate />} />
          </Route>
          <Route path="my-account">
            <Route path="transfer-points" element={<GoldTransferPoints />} />
            <Route path="cashout-points" element={<GoldCashoutPoints />} />
            <Route
              path="request-commissions"
              element={<GoldRequestCommission />}
            />
            <Route path="payment-mode" element={<GoldPaymentMode />} />
          </Route>
          <Route path="players">
            <Route path="agents" element={<GoldAgentList />} />
            <Route path="active" element={<GoldActivePlayers />} />
            <Route path="approval" element={<GoldPlayersApproval />} />
            <Route path="deactivated" element={<GoldDeactivatedPlayers />} />
          </Route>
          <Route path="logs">
            <Route path="transaction" element={<GoldTransactionsLogs />} />
            <Route path="cashout" element={<GoldCashoutLogs />} />
            <Route
              path="commissions-withdraw"
              element={<GoldCommissionsWithdraw />}
            />
          </Route>
          {/* <Route path="settings" element={<GoldSettings />} /> */}
        </Route>

        {/* SUB AGENT */}
        <Route path="sub" element={<RequireAuth allowedRoles={["sub"]} />}>
          <Route path="home" element={<SubDashboard />} />
          <Route path="inbox">
            <Route path="cashout-request" element={<SubCashoutRequest />} />
            <Route
              path="commissions-request"
              element={<SubCommissionsRequest />}
            />
          </Route>
          <Route path="commissions">
            <Route path="arena" element={<SubArenaCommissions />} />
            <Route path="by-date" element={<SubCommissionsByDate />} />
          </Route>
          <Route path="my-account">
            <Route path="transfer-points" element={<SubTransferPoints />} />
            <Route path="cashout-points" element={<SubCashoutPoints />} />
            <Route
              path="request-commissions"
              element={<SubRequestCommission />}
            />
            {/* <Route path="payment-mode" element={<SubPaymentMode />} /> */}
          </Route>
          <Route path="players">
            <Route path="master" element={<SubMasterAgent />} />
            <Route path="agents" element={<SubAgentList />} />
            <Route path="active" element={<SubActivePlayers />} />
            <Route path="approval" element={<SubPlayersApproval />} />
            <Route path="deactivated" element={<SubDeactivatedPlayers />} />
          </Route>
          <Route path="logs">
            <Route path="transaction" element={<SubTransactionsLogs />} />
            <Route path="cashout" element={<SubCashoutLogs />} />
            <Route
              path="commissions-withdraw"
              element={<SubCommissionsWithdraw />}
            />
          </Route>
          {/* <Route path="settings" element={<SubSettings />} /> */}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default Routers;
