import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const BettingLogsTableRow = () => {
  return (
    <tr className="text-center">
      <td className="text-truncate">ID</td>
      <td className="text-truncate d-flex justify-content-center">
        <div className="blt-type text-center ">
          <MDBIcon fas icon="location-arrow" /> bets-type
        </div>
      </td>
      <td className="text-truncate">Username</td>
      <td className="text-truncate">Event Name</td>
      <td className="text-truncate">Round</td>
      <td className="text-truncate">Bet Amount</td>
      <td className="text-truncate">Team</td>
      <td className="text-truncate">
        <div className="blt-date">Date Bet</div>
      </td>
    </tr>
  );
};

export default BettingLogsTableRow;
