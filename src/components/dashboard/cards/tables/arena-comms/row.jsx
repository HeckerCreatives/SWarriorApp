import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const ArenaCommissionsTableRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>
      <td className="text-truncate">{item.data.arenaLocation || "---"}</td>
      <td className="text-truncate">{item.data.eventName || "---"}</td>
      <td className="text-truncate">150</td>
      {/* <td className="text-truncate">Admin_Pablo</td> */}
      <td className="text-truncate">{item.data.eventType || "---"}</td>
      <td className="text-truncate">
        <div className="ac-plasada">{`${item.data.plasadaRate}%` || "---"}</div>
      </td>
      <td className="text-truncate">
        <div className="ac-tie-rate">{`x${item.data.tieRate}` || "---"}</div>
      </td>
      {/* <td className="text-truncate">
        <div className="ac-commissions" role="button">
          $ VIEW
        </div>  
      </td> */}
      <td className="text-truncate">
        <div className="ac-logs" role="button">
          <MDBIcon fas icon="list" />
        </div>
      </td>
      <td className="text-truncate">
        <div className="ac-date">
          {" "}
          {new Date(item.data.createdAt).toLocaleString()}
        </div>
      </td>
    </tr>
  );
};

export default ArenaCommissionsTableRow;
