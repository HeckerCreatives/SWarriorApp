import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";

const LoginLogsTableRow = ({ log }) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(log._id)}</td>
      <td className="text-truncate">{log.owner.username}</td>
      <td className="text-truncate">
        {log.event === "login" ? (
          <div className="llt-login">
            <MDBIcon fas icon="sign-in-alt" /> Login
          </div>
        ) : (
          <div className="llt-logout">
            <MDBIcon fas icon="sign-out-alt" /> Logout
          </div>
        )}
      </td>
      <td className="text-truncate">{log.country}</td>
      <td className="text-truncate">
        <div className="llt-ip">{log.ipAddress}</div>
      </td>

      <td className="text-truncate">
        <div className="llt-date">{handleDate(log.createdAt)}</div>
      </td>
    </tr>
  );
};

export default LoginLogsTableRow;
