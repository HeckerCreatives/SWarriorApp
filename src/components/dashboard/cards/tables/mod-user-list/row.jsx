// ** Third Party Components
import { MDBIcon } from "mdb-react-ui-kit";

// ** React
import React from "react";

// ** Modals
import PlayerProfileModal from "./profile-modal";
import PlayerProfileEdit from "./edit-profile-modal";
import PlayerTransactionHistory from "./transaction-history-modal";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";

const ModUserListTableRow = ({ agent }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="mul-sid">{handleCharLimit(agent._id)}</div>
      </td>
      <td className="text-truncate">{agent.username}</td>
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
      <td className="text-truncate">
        {agent.verified ? (
          <div className="mul-verification-verified">
            <MDBIcon fas icon="check" />
            &nbsp;&nbsp;Verified
          </div>
        ) : (
          <div className="mul-verification-unverified">
            <MDBIcon fas icon="times" />
            &nbsp;&nbsp;Unverified
          </div>
        )}
      </td>
      <td className="text-truncate">
        <div className="mul-date">{handleDate(agent.createdAt)}</div>
      </td>
      <td className="text-truncate">
        <PlayerProfileModal agent={agent} />
        {/* <PlayerTransactionHistory /> */}
        <PlayerProfileEdit agent={agent} />
      </td>
    </tr>
  );
};

export default ModUserListTableRow;
