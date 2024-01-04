import React from "react";

import CommsLogsModal from "./commission-logs-modal";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";

const CommsByDateTableRow = ({ arena }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(arena._id)}</td>
      <td className="text-truncate">{arena.eventName}</td>
      <td className="text-truncate">{arena.fights}</td>
      <td className="text-truncate">
        <div className="cbd-plasada">{arena.plasadaRate}</div>
      </td>
      <td className="text-truncate">
        <div className="cbd-tie-rate">x{arena.tieRate}</div>
      </td>
      <td className="text-truncate">
        <CommsLogsModal arenaId={arena._id} />
      </td>
      <td className="text-truncate">
        <div className="cbd-date">{handleDate(arena.createdAt)}</div>
      </td>
    </tr>
  );
};

export default CommsByDateTableRow;
