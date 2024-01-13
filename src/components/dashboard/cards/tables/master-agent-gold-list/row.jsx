import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

// ** Modals
import AgentProfileModal from "./profile-modal";
import AgentTransactionHistory from "./transaction-history-modal";
import AgentChangePassword from "./changePassword";
import AgentEditCommissionRate from "./editCommissionRate";
import {
  handleAmount,
  handleCharLimit,
  handleDate,
} from "../../../../../utility/utils";
import { userInfo } from "../../../../../utility/UserInfo";

const AgentGoldListTableRow = ({ agent }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="afl-sid">{handleCharLimit(agent._id)}</div>
      </td>
      <td className="text-truncate">{agent.username}</td>
      <td className="text-truncate">{handleAmount(agent.creditWallet)}</td>
      <td className="text-truncate">{handleAmount(agent.commsWallet)}</td>
      <td className="text-truncate">
        {agent.status === "approved" ? (
          <div className="afl-status-active">
            <MDBIcon fas icon="check-circle" />
            &nbsp;&nbsp;Active
          </div>
        ) : (
          <div className="afl-status-blocked">
            <MDBIcon fas icon="minus-circle" />
            &nbsp;&nbsp;Blocked
          </div>
        )}
      </td>
      <td className="text-truncate">
        {agent.verified ? (
          <div className="afl-verification-verified">
            <MDBIcon fas icon="check" />
            &nbsp;&nbsp;Verified
          </div>
        ) : (
          <div className="afl-verification-unverified">
            <MDBIcon fas icon="times" />
            &nbsp;&nbsp;Unverified
          </div>
        )}
      </td>
      <td className="text-truncate">
        <AgentProfileModal agent={agent} />
        <AgentTransactionHistory agentId={agent._id} />
      </td>

      <td>
        <AgentEditCommissionRate agent={agent} />
      </td>

      <td className="ps-0">
        {userInfo().roleName === "Superadmin" && (
          <AgentChangePassword
            agentId={agent._id}
            agentUname={agent.username}
          />
        )}
      </td>

      <td className="text-truncate">
        <div className="agl-date">{handleDate(agent.createdAt)}</div>
      </td>
    </tr>
  );
};

export default AgentGoldListTableRow;
