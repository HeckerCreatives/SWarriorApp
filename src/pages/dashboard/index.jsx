// ** React
import { useEffect, useLayoutEffect, useState } from "react";

// ** Third Party Components
import { MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import { Outlet } from "react-router-dom";

// ** Components
import DashboardSidebar from "../../components/dashboard/sidebar";
import { userInfo } from "../../utility/UserInfo";
import useProfileStore from "../../stores/profileStore";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [didToggle, setDidToggle] = useState(
    window.innerWidth > 768 ? false : true
  );

  const loginUser = userInfo();

  const getProfile = useProfileStore(state => state.getProfile);
  const profile = useProfileStore(state => state.profile);

  useLayoutEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, [profile]);

  useEffect(() => {
    switch (loginUser.roleName) {
      case "Superadmin":
        setLinks([
          {
            name: "DASHBOARD",
            path: "/dashboard/superadmin/home",
            icon: "home",
            children: [],
          },
          {
            name: "INBOX",
            path: "",
            icon: "inbox",
            children: [
              {
                name: "Cashout Requests",
                path: "/dashboard/superadmin/inbox/cashout-request",
              },
              {
                name: "Commissions Requests",
                path: "/dashboard/superadmin/inbox/commissions-request",
              },
            ],
          },
          {
            name: "ARENA MODERATOR",
            path: "",
            icon: "user-astronaut",
            children: [
              {
                name: "Live Arenas",
                path: "/dashboard/superadmin/arena-moderator/live-arenas",
              },
              {
                name: "Closed Arenas",
                path: "/dashboard/superadmin/arena-moderator/closed-arena",
              },
              {
                name: "Create Videos",
                path: "/dashboard/superadmin/arena-moderator/create-videos",
              },
              {
                name: "Video Monitoring",
                path: "/dashboard/superadmin/arena-moderator/video-monitoring",
              },
            ],
          },
          {
            name: "COMMISSIONS",
            path: "",
            icon: "percent",
            children: [
              // {
              //   name: "Arena Commissions",
              //   path: "/dashboard/superadmin/commissions/arena-commissions",
              // },
              {
                name: "Commission By Date",
                path: "/dashboard/superadmin/commissions/commission-by-date",
              },
            ],
          },
          {
            name: "MONITORING",
            path: "",
            icon: "desktop",
            children: [
              {
                name: "Top Points",
                path: "/dashboard/superadmin/monitoring/top-points",
              },
              {
                name: "Top Commissions",
                path: "/dashboard/superadmin/monitoring/top-commissions",
              },
            ],
          },
          {
            name: "USERS",
            path: "",
            icon: "users",
            children: [
              {
                name: "Moderator / Declarator",
                path: "/dashboard/superadmin/users/moderator",
              },
              {
                name: "Accountants",
                path: "/dashboard/superadmin/users/accountants",
              },
              {
                name: "CSR's",
                path: "/dashboard/superadmin/users/csr",
              },
              {
                name: "Players / Cashiers",
                path: "/dashboard/superadmin/users/players",
              },
            ],
          },
          {
            name: "AGENTS",
            path: "",
            icon: "user-tie",
            children: [
              {
                name: "Financers",
                path: "/dashboard/superadmin/agents/financers",
              },
              {
                name: "Sub Agents",
                path: "/dashboard/superadmin/agents/sub",
              },
              {
                name: "Master Agents",
                path: "/dashboard/superadmin/agents/master",
              },
              {
                name: "Gold Agents",
                path: "/dashboard/superadmin/agents/gold",
              },
            ],
          },
          {
            name: "LOG BOOKS",
            path: "",
            icon: "book",
            children: [
              {
                name: "Transaction Logs",
                path: "/dashboard/superadmin/logs/transaction",
              },
              {
                name: "Betting Logs",
                path: "/dashboard/superadmin/logs/betting",
              },
              {
                name: "Login Logs",
                path: "/dashboard/superadmin/logs/login",
              },
              {
                name: "Cashout Logs",
                path: "/dashboard/superadmin/logs/cashout",
              },
              {
                name: "Commission Withdraw Logs",
                path: "/dashboard/superadmin/logs/commissions-withdraw",
              },
            ],
          },
          {
            name: "SUPER ADMIN",
            path: "",
            icon: "user-cog",
            children: [
              // {
              //   name: "Site Settings",
              //   path: "/dashboard/superadmin/settings/site-settings",
              // },
              // {
              //   name: "Variance Check",
              //   path: "/dashboard/superadmin/settings/variance-check",
              // },
              // {
              //   name: "Online Users",
              //   path: "/dashboard/superadmin/settings/online-users",
              // },
              {
                name: "Global Announcements",
                path: "/dashboard/superadmin/settings/global-announcement",
              },
              {
                name: "Transfer Points",
                path: "/dashboard/superadmin/settings/transfer-points",
              },
              {
                name: "Create Users Account",
                path: "/dashboard/superadmin/settings/create-user",
              },
              // {
              //   name: "Refferal-Tree",
              //   path: "/dashboard/superadmin/settings/refferalTree",
              // },
            ],
          },
        ]);
        break;

      case "Moderator":
        setLinks([
          {
            name: "ARENA MODERATOR",
            path: "",
            icon: "user-astronaut",
            children: [
              {
                name: "Live Arenas",
                path: "/dashboard/moderator/live-arenas",
              },
              {
                name: "Closed Arenas",
                path: "/dashboard/moderator/closed-arenas",
              },
              {
                name: "Create Videos",
                path: "/dashboard/moderator/create-videos",
              },
              {
                name: "Video Monitoring",
                path: "/dashboard/moderator/video-monitoring",
              },
            ],
          },
        ]);
        break;

      case "Accountant":
        setLinks([
          {
            name: "DASHBOARD",
            path: "/dashboard/accountant/home",
            icon: "home",
            children: [],
          },
          // {
          //   name: "INBOX",
          //   path: "",
          //   icon: "inbox",
          //   children: [
          //     {
          //       name: "Cashout Requests",
          //       path: "/dashboard/accountant/inbox/cashout-request",
          //     },
          //     {
          //       name: "Commissions Requests",
          //       path: "/dashboard/accountant/inbox/commission-request",
          //     },
          //   ],
          // },
          {
            name: "COMMISSIONS",
            path: "",
            icon: "percent",
            children: [
              // {
              //   name: "Arena Commissions",
              //   path: "/dashboard/accountant/commissions/arena-commissions",
              // },
              {
                name: "Commission By Date",
                path: "/dashboard/accountant/commissions/commissions-by-date",
              },
            ],
          },
          {
            name: "MONITORING",
            path: "",
            icon: "desktop",
            children: [
              {
                name: "Top Points",
                path: "/dashboard/accountant/monitoring/top-points",
              },
              {
                name: "Top Commissions",
                path: "/dashboard/accountant/monitoring/top-commissions",
              },
            ],
          },
          {
            name: "AGENTS",
            path: "",
            icon: "user-tie",
            children: [
              {
                name: "Financers",
                path: "/dashboard/accountant/agents/financer",
              },
              {
                name: "Sub Agents",
                path: "/dashboard/accountant/agents/sub",
              },
              {
                name: "Master Agents",
                path: "/dashboard/accountant/agents/master",
              },
              {
                name: "Gold Agents",
                path: "/dashboard/accountant/agents/gold",
              },
            ],
          },
          {
            name: "LOG BOOKS",
            path: "",
            icon: "book",
            children: [
              {
                name: "Transaction Logs",
                path: "/dashboard/accountant/logs/transaction",
              },
              {
                name: "Betting Logs",
                path: "/dashboard/accountant/logs/betting",
              },
              // {
              //   name: "Login Logs",
              //   path: "/dashboard/accountant/logs/login",
              // },
              {
                name: "Cashout Logs",
                path: "/dashboard/accountant/logs/cashout",
              },
              {
                name: "Commission Withdraw Logs",
                path: "/dashboard/accountant/logs/commissions-withdraw",
              },
            ],
          },
        ]);
        break;

      case "CSR":
        setLinks([
          {
            name: "DASHBOARD",
            path: "/dashboard/csr/home",
            icon: "home",
            children: [],
          },
          {
            name: "INBOX",
            path: "",
            icon: "inbox",
            children: [
              {
                name: "Cashout Requests",
                path: "/dashboard/csr/inbox/cashout-request",
              },
              {
                name: "Commissions Requests",
                path: "/dashboard/csr/inbox/commission-request",
              },
            ],
          },
          // {
          //   name: "MONITORING",
          //   path: "",
          //   icon: "desktop",
          //   children: [
          //     {
          //       name: "Top Points",
          //       path: "/dashboard/csr/monitoring/top-points",
          //     },
          //     {
          //       name: "Top Commissions",
          //       path: "/dashboard/csr/monitoring/top-commissions",
          //     },
          //   ],
          // },
          {
            name: "USERS",
            path: "",
            icon: "user-alt",
            children: [
              {
                name: "Players",
                path: "/dashboard/csr/users/players",
              },
            ],
          },
          {
            name: "AGENTS",
            path: "",
            icon: "user-tie",
            children: [
              {
                name: "Financers",
                path: "/dashboard/csr/agents/financer",
              },
              {
                name: "Sub Agents",
                path: "/dashboard/csr/agents/sub",
              },
              {
                name: "Master Agents",
                path: "/dashboard/csr/agents/master",
              },
              {
                name: "Gold Agents",
                path: "/dashboard/csr/agents/gold",
              },
            ],
          },
          {
            name: "LOG BOOKS",
            path: "",
            icon: "book",
            children: [
              {
                name: "Transaction Logs",
                path: "/dashboard/csr/logs/transaction",
              },
              {
                name: "Betting Logs",
                path: "/dashboard/csr/logs/betting",
              },
              // {
              //   name: "Login Logs",
              //   path: "/dashboard/csr/logs/login",
              // },
              {
                name: "Cashout Logs",
                path: "/dashboard/csr/logs/cashout",
              },
              {
                name: "Commission Withdraw Logs",
                path: "/dashboard/csr/logs/commissions-withdraw",
              },
            ],
          },
        ]);
        break;

      case "Financer":
        setLinks([
          {
            name: "DASHBOARD",
            path: "/dashboard/financer/home",
            icon: "home",
            children: [],
          },
          {
            name: "INBOX",
            path: "",
            icon: "inbox",
            children: [
              {
                name: "Cashout Requests",
                path: "/dashboard/financer/inbox/cashout-request",
              },
              {
                name: "Commissions Requests",
                path: "/dashboard/financer/inbox/commissions-request",
              },
            ],
          },
          {
            name: "COMMISSIONS",
            path: "",
            icon: "percent",
            children: [
              // {
              //   name: "Commission Breakdown",
              //   path: "/dashboard/financer/commissions/breakdown",
              // },
              // {
              //   name: "Commission Withdraw",
              //   path: "/dashboard/financer/commissions/withdraw",
              // },
              {
                name: "Arena Commissions",
                path: "/dashboard/financer/commissions/arena",
              },
            ],
          },
          {
            name: "MY ACCOUNT",
            path: "",
            icon: "user-circle",
            children: [
              {
                name: "Transfer Points",
                path: "/dashboard/financer/my-account/transfer-points",
              },
              {
                name: "Cashout Points",
                path: "/dashboard/financer/my-account/cashout-points",
              },
              // {
              //   name: "Payment Mode",
              //   path: "/dashboard/financer/my-account/payment-mode",
              // },
              {
                name: "Request Commission",
                path: "/dashboard/financer/my-account/request-commissions",
              },
              // {
              //   name: "Edit Profile",
              //   path: "/dashboard/financer/my-account/edit-profile",
              // },
            ],
          },
          {
            name: "MY NETWORK",
            path: "",
            icon: "sitemap",
            children: [
              {
                name: "Sub Agents",
                path: "/dashboard/financer/my-network/sub-agent",
              },
              {
                name: "Active Players",
                path: "/dashboard/financer/my-network/active",
              },
              {
                name: "Approval Users",
                path: "/dashboard/financer/my-network/approval",
              },
              {
                name: "Deactivated",
                path: "/dashboard/financer/my-network/deactivated",
              },
            ],
          },
          {
            name: "LOG BOOKS",
            path: "",
            icon: "book",
            children: [
              {
                name: "Transaction Logs",
                path: "/dashboard/financer/logs/transaction",
              },
              {
                name: "Cashout Logs",
                path: "/dashboard/financer/logs/cashout",
              },
              {
                name: "Commission Withdrawal Logs",
                path: "/dashboard/financer/logs/commissions-withdraw",
              },
            ],
          },
          // {
          //   name: "SETTINGS",
          //   path: "/dashboard/financer/settings",
          //   icon: "cogs",
          //   children: [],
          // },
        ]);
        break;

      case "Master":
        setLinks([
          {
            name: "DASHBOARD",
            path: "/dashboard/master/home",
            icon: "home",
            children: [],
          },
          {
            name: "INBOX",
            path: "",
            icon: "inbox",
            children: [
              {
                name: "Cashout Requests",
                path: "/dashboard/master/inbox/cashout-request",
              },
              {
                name: "Commissions Requests",
                path: "/dashboard/master/inbox/commissions-request",
              },
            ],
          },
          {
            name: "COMMISSIONS",
            path: "",
            icon: "percent",
            children: [
              {
                name: "Arena Commissions",
                path: "/dashboard/master/commissions/arena",
              },
              // {
              //   name: "Commission By Date",
              //   path: "/dashboard/master/commissions/by-date",
              // },
            ],
          },
          {
            name: "MY ACCOUNT",
            path: "",
            icon: "user-circle",
            children: [
              {
                name: "Transfer Points",
                path: "/dashboard/master/my-account/transfer-points",
              },
              {
                name: "Cashout Points",
                path: "/dashboard/master/my-account/cashout-points",
              },
              {
                name: "Request Commission",
                path: "/dashboard/master/my-account/request-commissions",
              },
              // {
              //   name: "Payment Mode",
              //   path: "/dashboard/master/my-account/payment-mode",
              // },
            ],
          },
          {
            name: "PLAYERS",
            path: "",
            icon: "users",
            children: [
              {
                name: "Gold",
                path: "/dashboard/master/players/agents",
              },
              {
                name: "Active Players",
                path: "/dashboard/master/players/active",
              },
              {
                name: "Approval Users",
                path: "/dashboard/master/players/approval",
              },
              {
                name: "Deactivated",
                path: "/dashboard/master/players/deactivated",
              },
            ],
          },

          {
            name: "LOG BOOKS",
            path: "",
            icon: "book",
            children: [
              {
                name: "Transaction Logs",
                path: "/dashboard/master/logs/transaction",
              },
              {
                name: "Cashout Logs",
                path: "/dashboard/master/logs/cashout",
              },
              {
                name: "Commission Withdrawal Logs",
                path: "/dashboard/master/logs/commissions-withdraw",
              },
            ],
          },
          // {
          //   name: "SETTINGS",
          //   path: "/dashboard/master/settings",
          //   icon: "cogs",
          //   children: [],
          // },
        ]);
        break;

      case "Gold":
        setLinks([
          {
            name: "DASHBOARD",
            path: "/dashboard/gold/home",
            icon: "home",
            children: [],
          },
          {
            name: "INBOX",
            path: "",
            icon: "inbox",
            children: [
              {
                name: "Cashout Requests",
                path: "/dashboard/gold/inbox/cashout-request",
              },
            ],
          },
          {
            name: "COMMISSIONS",
            path: "",
            icon: "percent",
            children: [
              {
                name: "Arena Commissions",
                path: "/dashboard/gold/commissions/arena",
              },
              // {
              //   name: "Commission By Date",
              //   path: "/dashboard/gold/commissions/by-date",
              // },
            ],
          },
          {
            name: "MY ACCOUNT",
            path: "",
            icon: "user-circle",
            children: [
              {
                name: "Transfer Points",
                path: "/dashboard/gold/my-account/transfer-points",
              },
              {
                name: "Cashout Points",
                path: "/dashboard/gold/my-account/cashout-points",
              },
              {
                name: "Request Commission",
                path: "/dashboard/gold/my-account/request-commissions",
              },
              // {
              //   name: "Payment Mode",
              //   path: "/dashboard/gold/my-account/payment-mode",
              // },
            ],
          },
          {
            name: "PLAYERS",
            path: "",
            icon: "users",
            children: [
              // {
              //   name: "Agents",
              //   path: "/dashboard/gold/players/agents",
              // },
              {
                name: "Active Players",
                path: "/dashboard/gold/players/active",
              },
              {
                name: "Approval Users",
                path: "/dashboard/gold/players/approval",
              },
              {
                name: "Deactivated",
                path: "/dashboard/gold/players/deactivated",
              },
            ],
          },

          {
            name: "LOG BOOKS",
            path: "",
            icon: "book",
            children: [
              {
                name: "Transaction Logs",
                path: "/dashboard/gold/logs/transaction",
              },
              {
                name: "Cashout Logs",
                path: "/dashboard/gold/logs/cashout",
              },
              // {
              //   name: "Commission Withdrawal Logs",
              //   path: "/dashboard/gold/logs/commissions-withdraw",
              // },
            ],
          },
          // {
          //   name: "SETTINGS",
          //   path: "/dashboard/gold/settings",
          //   icon: "cogs",
          //   children: [],
          // },
        ]);
        break;

      default:
        setLinks([
          {
            name: "DASHBOARD",
            path: "/dashboard/sub/home",
            icon: "home",
            children: [],
          },
          {
            name: "INBOX",
            path: "",
            icon: "inbox",
            children: [
              {
                name: "Cashout Requests",
                path: "/dashboard/sub/inbox/cashout-request",
              },
              {
                name: "Commissions Requests",
                path: "/dashboard/sub/inbox/commissions-request",
              },
            ],
          },
          {
            name: "COMMISSIONS",
            path: "",
            icon: "percent",
            children: [
              {
                name: "Arena Commissions",
                path: "/dashboard/sub/commissions/arena",
              },
              // {
              //   name: "Commission By Date",
              //   path: "/dashboard/sub/commissions/by-date",
              // },
            ],
          },
          {
            name: "MY ACCOUNT",
            path: "",
            icon: "user-circle",
            children: [
              {
                name: "Transfer Points",
                path: "/dashboard/sub/my-account/transfer-points",
              },
              {
                name: "Cashout Points",
                path: "/dashboard/sub/my-account/cashout-points",
              },
              {
                name: "Request Commission",
                path: "/dashboard/sub/my-account/request-commissions",
              },
              // {
              //   name: "Payment Mode",
              //   path: "/dashboard/sub/my-account/payment-mode",
              // },
            ],
          },
          {
            name: "PLAYERS",
            path: "",
            icon: "users",
            children: [
              {
                name: "Master Agents",
                // path: "/dashboard/sub/players/agents",
                path: "/dashboard/sub/players/master",
              },
              {
                name: "Active Players",
                path: "/dashboard/sub/players/active",
              },
              {
                name: "Approval Users",
                path: "/dashboard/sub/players/approval",
              },
              {
                name: "Deactivated",
                path: "/dashboard/sub/players/deactivated",
              },
            ],
          },
          {
            name: "LOG BOOKS",
            path: "",
            icon: "book",
            children: [
              {
                name: "Transaction Logs",
                path: "/dashboard/sub/logs/transaction",
              },
              {
                name: "Cashout Logs",
                path: "/dashboard/sub/logs/cashout",
              },
              {
                name: "Commission Withdrawal Logs",
                path: "/dashboard/sub/logs/commissions-withdraw",
              },
            ],
          },
          // {
          //   name: "SETTINGS",
          //   path: "/dashboard/sub/settings",
          //   icon: "cogs",
          //   children: [],
          // },
        ]);
        break;
    }
  }, []);

  return (
    <MDBContainer fluid className="px-0">
      {window.innerWidth < 768 && (
        <MDBIcon
          fas
          icon="bars"
          size="2x"
          className="text-warning side-menu-toggle"
          role="button"
          onClick={() => setDidToggle(!didToggle)}
        />
      )}
      <main
        className="d-flex main-container"
        style={{
          paddingLeft:
            window.innerWidth > 768
              ? didToggle
                ? window.innerWidth < 768
                  ? "0rem"
                  : "4.5rem"
                : "20rem"
              : "0rem",
        }}
      >
        <DashboardSidebar
          links={links}
          didToggle={didToggle}
          setDidToggle={setDidToggle}
        />
        <MDBContainer fluid className="px-0 main-bg">
          <Outlet />
        </MDBContainer>
      </main>
    </MDBContainer>
  );
};

export default Dashboard;
