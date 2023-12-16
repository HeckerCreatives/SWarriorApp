import React from "react";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";
import CloseArenaModal from "./CloseArenaModal";
import EditArenaModal from "./EditArenaModal";

const LiveArenaTableRow = ({ arena }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(arena._id)}</td>
      <td className="text-truncate">{arena.eventName}</td>
      <td className="text-truncate">{arena.fights}</td>
      <td className="text-truncate">{arena.moderator.username}</td>
      <td className="text-truncate">{arena.arenaVideo.name}</td>
      <td className="text-truncate">{arena.eventType}</td>
      <td className="text-truncate">{arena.plasadaRate}</td>
      <td className="text-truncate">
        {arena.drawEnabled ? arena?.tieRate : "N/A"}
      </td>
      <td className="text-truncate">{handleDate(arena.createdAt)}</td>
      <td>
        <CloseArenaModal data={arena} />
        &nbsp;&nbsp;&nbsp;
        <EditArenaModal data={arena} />
      </td>
    </tr>
  );
};

export default LiveArenaTableRow;
