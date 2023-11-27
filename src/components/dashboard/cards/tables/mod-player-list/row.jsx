// ** Third Party Components
import { MDBIcon, MDBSwitch } from "mdb-react-ui-kit";

// ** React
import React from "react";

// ** Modals
import PlayerProfileModal from "./profile-modal";
import PlayerProfileEdit from "./edit-profile-modal";
import PlayerTransactionHistory from "./transaction-history-modal";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";
import { userInfo } from "../../../../../utility/UserInfo";

const ModPlayerListTableRow = ({ agent }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="mpl-sid">{handleCharLimit(agent._id)}</div>
      </td>
      <td className="text-truncate">{agent.username}</td>
      <td className="text-truncate">{Number(agent.creditWallet).toFixed(2)}</td>
      <td className="text-truncate">{agent.roleName}</td>
      {/* <td className="text-truncate">Regular</td> */}
      <td className="text-truncate">{agent.details.email}</td>
      <td className="text-truncate">{agent.details.phoneNumber}</td>
      <td className="text-truncate">
        {agent.status === "approved" ? (
          <div className="mul-status-active">
            <MDBIcon fas icon="check-circle" />
            &nbsp;&nbsp;Active
          </div>
        ) : (
          <div className="mul-status-blocked">
            <MDBIcon fas icon="minus-circle" />
            &nbsp;&nbsp;Blocked
          </div>
        )}
      </td>
      {/* <td className="text-truncate">
        <div className="mpl-verification-verified">
          <MDBIcon fas icon="check" />
          &nbsp;&nbsp;Verified
        </div>
        <div className="mpl-verification-unverified">
          <MDBIcon fas icon="times" />
          &nbsp;&nbsp;Unverified
        </div>
      </td> */}
      <td className="text-truncate">
        <div className="mcl-date">{handleDate(agent.createdAt)}</div>
      </td>
      <td className="text-truncate">
        <PlayerProfileModal agent={agent} />
        <PlayerTransactionHistory agentId={agent._id} />
        {userInfo().roleName === "Superadmin" && (
          <PlayerProfileEdit agent={agent} />
        )}
      </td>
      <td>
        <MDBSwitch id="flexSwitchCheckDefault" />
      </td>
    </tr>
  );
};

export default ModPlayerListTableRow;
