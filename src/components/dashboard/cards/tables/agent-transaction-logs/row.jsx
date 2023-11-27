import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const AgentTransactionLogsTableRow = ({ item }) => {
  const handleCharLimit = str => `${str.substring(0, 10)}...`;

  const handleDate = date =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(item._id)}</td>
      <td className="text-truncate text-capitalize">{item.action}</td>
      <td className="text-truncate">{item.by.username}</td>
      <td className="text-truncate">{item.sender.username}</td>
      <td className="text-truncate">
        <MDBIcon fas icon="arrow-right" />
      </td>
      <td className="text-truncate">{item.receiver.username}</td>
      <td className="text-truncate text-warning">
        {Number(item.amount).toFixed(2)}
      </td>
      <td className="text-truncate">
        <div className="tlt-date">{handleDate(item.createdAt)}</div>
      </td>
    </tr>
  );
};

export default AgentTransactionLogsTableRow;
