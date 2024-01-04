import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";
import CommsLogsModal from "../comms-by-date/commission-logs-modal";

const ArenaCommissionsTableRow = ({ arena }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(arena._id)}</td>
      <td className="text-truncate">{arena.eventName}</td>
      <td className="text-truncate">{arena.fights}</td>
      <td className="text-truncate">{arena.eventType}</td>
      <td className="text-truncate">
        <div className="ac-plasada">{arena.plasadaRate}</div>
      </td>
      <td className="text-truncate">
        <div className="ac-tie-rate">x{arena.tieRate}</div>
      </td>
      <td className="text-truncate">
        <div className="ac-logs" role="button">
          <CommsLogsModal arenaId={arena._id} />
        </div>
      </td>
      <td className="text-truncate">
        <div className="ac-date">{handleDate(arena.createdAt)}</div>
      </td>
    </tr>
  );
};

export default ArenaCommissionsTableRow;
