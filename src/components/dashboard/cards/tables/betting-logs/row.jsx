import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";

const BettingLogsTableRow = ({ bet }) => {
  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(bet._id)}</td>
      <td className="text-truncate">{bet.owner.username}</td>
      <td className="text-truncate">{bet.arenaId.eventName}</td>
      <td className="text-truncate">{bet.roundId.roundNumber}</td>
      <td className="text-truncate">{handleNumber(bet.amount)}</td>
      <td className="text-truncate">
        <div className="blt-date">{handleDate(bet.createdAt)}</div>
      </td>
    </tr>
  );
};

export default BettingLogsTableRow;
