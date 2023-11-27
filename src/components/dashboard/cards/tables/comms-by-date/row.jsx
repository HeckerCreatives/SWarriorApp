import React from "react";

import CommsLogsModal from "./commission-logs-modal";

const CommsByDateTableRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>
      <td className="text-truncate">{item.data.arenaLocation || "---"}</td>
      <td className="text-truncate">{item.data.eventName || "---"}</td>
      <td className="text-truncate">150</td>
      {/* <td className="text-truncate">Admin_Pablo</td> */}
      <td className="text-truncate">{item.data.eventType || "---"}</td>
      <td className="text-truncate">
        <div className="cbd-plasada">
          {`${item.data.plasadaRate}%` || "---"}
        </div>
      </td>
      <td className="text-truncate">
        <div className="cbd-tie-rate">{`x${item.data.tieRate}` || "---"}</div>
      </td>
      {/* <td className="text-truncate">
        <div className="cbd-commissions" role="button">
          $ VIEW
        </div>
      </td> */}
      <td className="text-truncate">
        <CommsLogsModal data={item.data} />
      </td>
      <td className="text-truncate">
        <div className="cbd-date">
          {" "}
          {new Date(item.data.createdAt).toLocaleString()}
        </div>
      </td>
    </tr>
  );
};

export default CommsByDateTableRow;
