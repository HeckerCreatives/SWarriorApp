import React from "react";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";
import AgentRequestDetailsModal from "./request-modal";
import AgentCashoutRequestModal from "./modal";

const AgentCashoutRequestTableRow = ({ request }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="coreq-pid">{handleCharLimit(request._id)}</div>
      </td>
      <td className="text-truncate">
        <div
          className={`coreq-pending d-flex align-items-center justify-content-center text-capitalize`}
        >
          <div className="coreq-new-icon d-flex align-items-center justify-content-center" />
          &nbsp; <span>{request.status}</span>
        </div>
      </td>
      <td className="text-truncate">{request.owner.username}</td>
      <td className="text-truncate">{Number(request.amount).toFixed(2)}</td>
      <td className="text-truncate">
        <AgentRequestDetailsModal request={request} />
      </td>
      <td className="text-truncate">Unassigned</td>
      <td className="text-truncate">
        <div className="coreq-date">{handleDate(request.createdAt)}</div>
      </td>
      <td className="">
        <AgentCashoutRequestModal request={request} />
      </td>
    </tr>
  );
};

export default AgentCashoutRequestTableRow;
