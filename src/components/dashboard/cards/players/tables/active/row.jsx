import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import PlayerProfileModal from "./profile-modal";
import PlayerDeactivate from "./playerDeactivate";
import PlayerReactivate from "./playerReactivate";
import { handleCharLimit } from "../../../../../../utility/utils";

const PlayerActiveTableRow = ({ agent }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(agent._id)}</td>

      <td className="text-truncate">{agent.username}</td>
      <td className="text-truncate">{Number(agent.creditWallet).toFixed(2)}</td>
      <td className="text-truncate text-capitalize">{agent.status}</td>
      <td className="text-truncate">---</td>
      <td className="text-truncate">
        <PlayerProfileModal agent={agent} />
        <PlayerDeactivate agent={agent} />
      </td>
    </tr>
  );
};

export default PlayerActiveTableRow;
