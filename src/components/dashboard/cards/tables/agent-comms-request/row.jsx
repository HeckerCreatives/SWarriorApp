import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

import CashoutRequestModal from "./modal";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";

const CommissionRequestTableRow = ({ request }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="comreq-ref">{handleCharLimit(request._id)}</div>
      </td>
      <td className="text-truncate">
        <div
          className={`comreq-status-status d-flex align-items-center justify-content-center text-capitalize`}
        >
          <div className="comreq-status-icon d-flex align-items-center justify-content-center" />
          &nbsp; <span>{request.status}</span>
        </div>
      </td>
      <td className="text-truncate">{request.owner.username}</td>
      <td className="text-truncate">{Number(request.amount).toFixed(2)}</td>
      <td className="text-truncate">
        <div className="comreq-details">
          Agent {request.owner.username} requested to withdraw {request.amount}{" "}
          points from its available commission earnings.
        </div>
      </td>
      <td className="text-truncate">Unassigned</td>
      <td className="text-truncate">
        <div className="comreq-date">{handleDate(request.createdAt)}</div>
      </td>
      <td className="">
        <CashoutRequestModal request={request} />
      </td>
    </tr>
  );
};

export default CommissionRequestTableRow;
