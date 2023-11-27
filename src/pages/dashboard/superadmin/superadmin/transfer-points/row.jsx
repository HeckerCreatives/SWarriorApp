import React from "react";

const TransferPointsRow = ({ item }) => {
  const handleCharLimit = str => `${str.substring(0, 5)}...`;

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
      <td className="text-truncate">{">"}</td>
      <td className="text-truncate">{item.receiver.username}</td>
      <td className="text-truncate">{item.amount}</td>
      <td className="text-truncate">{handleDate(item.createdAt)}</td>
    </tr>
  );
};

export default TransferPointsRow;
