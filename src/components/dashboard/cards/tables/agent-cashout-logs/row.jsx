import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";

const AgentCashoutLogsTableRow = ({ log }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(log._id)}</td>
      <td className="text-truncate text-info">{log.owner.username}</td>
      <td className="text-truncate">
        <div className="clt-assigned">
          <MDBIcon fas icon="user-alt" /> {log.agent.username}
        </div>
      </td>
      <td className="text-truncate text-primary">
        {Number(log.amount).toFixed(2)}
      </td>
      <td
        className={`text-truncate ${
          log.status === "done" ? "text-success" : "text-danger"
        }`}
      >
        <small>
          {log.status === "done" ? `Approved by` : `Rejected by`}{" "}
          {log.processedBy.username}
        </small>
      </td>
      <td className="text-truncate">
        <div className="clt-date">{handleDate(log.createdAt)}</div>
      </td>
    </tr>
  );
};

export default AgentCashoutLogsTableRow;
