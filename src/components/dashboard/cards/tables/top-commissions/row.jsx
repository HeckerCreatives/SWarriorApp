import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

import ViewProfileModal from "./modal";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";

const TopCommissionsTableRow = ({ data }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(data._id)}</td>
      <td className="text-truncate">
        <div className="tc-username">
          <MDBIcon fas icon="user-alt" /> &nbsp;{data.username}
        </div>
      </td>
      <td className="text-truncate">
        <div className="tc-wallet-balance">
          {Number(data.commsWallet).toFixed(2)}
        </div>
      </td>
      <td className="text-truncate">{handleDate(data.createdAt)}</td>
      <td className="text-truncate">
        <ViewProfileModal data={data} />
      </td>
    </tr>
  );
};

export default TopCommissionsTableRow;
