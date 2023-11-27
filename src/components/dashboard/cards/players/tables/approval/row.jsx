import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

// ** Components
import ApproveAndDeactModal from "./approveAndDeactModal";
import PlayerApproveAndDeactivate from "./playerApproveAndDeact";
import { handleCharLimit, handleDate } from "../../../../../../utility/utils";

const PlayerApprovalTableRow = ({ agent }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(agent._id)}</td>
      <td className="text-truncate">{agent.username}</td>
      <td className="text-truncate">{handleDate(agent.createdAt)}</td>
      <td className="text-truncate">
        {agent.roleName === "Player" ? (
          <PlayerApproveAndDeactivate agent={agent} />
        ) : (
          <ApproveAndDeactModal agent={agent} />
        )}
      </td>
    </tr>
  );
};

export default PlayerApprovalTableRow;
