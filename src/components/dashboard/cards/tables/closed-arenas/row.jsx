import React from "react";
import ArenaLogsModal from "./modal";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";

const ClosedArenaTableRow = ({ data }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(data._id)}</td>
      <td className="text-truncate">{data.location}</td>
      <td className="text-truncate">{data.eventName}</td>
      <td className="text-truncate">{data.fights}</td>
      <td className="text-truncate">{data.moderator.username}</td>
      <td className="text-truncate">{data.arenaVideo.name}</td>
      <td className="text-truncate">{data.eventType}</td>
      <td className="text-truncate">
        <div className="ca-plasada-rate">{data.plasadaRate}</div>
      </td>
      <td className="text-truncate">
        <div className="ca-tie-rate">
          {data.drawEnabled ? data.tieRate : "N/A"}
        </div>
      </td>
      <td className="text-truncate">
        <div className="ca-date">{handleDate(data.createdAt)}</div>
      </td>
      <td className="text-truncate">
        <ArenaLogsModal />
      </td>
    </tr>
  );
};

export default ClosedArenaTableRow;
