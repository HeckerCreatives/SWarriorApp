import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

import ViewProfileModal from "./modal";

const TopPointsTableRow = ({ data }) => {
  const handleCharLimit = str => `${str.substring(0, 15)}...`;

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
      <td className="text-truncate">{handleCharLimit(data._id)}</td>
      <td className="text-truncate">
        <div className="tp-username">
          <MDBIcon fas icon="user-alt" /> &nbsp;{data.username}
        </div>
      </td>
      <td className="text-truncate">
        <div className="tp-wallet-balance">
          {Number(data.creditWallet).toFixed(2)}
        </div>
      </td>
      <td className="text-truncate">{handleDate(data.createdAt)}</td>
      <td className="text-truncate">
        <ViewProfileModal data={data} />
      </td>
    </tr>
  );
};

export default TopPointsTableRow;
