import React from "react";
import ArenaLogsModal from "./modal";

const ClosedArenaTableRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>
      <td className="text-truncate">{item.data.arenaLocation || "---"}</td>
      <td className="text-truncate">{item.data.eventName || "---"}</td>
      <td className="text-truncate">150</td>
      {/* <td className="text-truncate">Moderator</td> */}
      <td className="text-truncate">
        {item.data.arena_video_id
          ? item.data.arena_video_id.videoName
          : "[deleted]"}
      </td>
      <td className="text-truncate">{item.data.eventType || "---"}</td>
      <td className="text-truncate">
        <div className="ca-plasada-rate">
          {`${item.data.plasadaRate}%` || "---"}
        </div>
      </td>
      <td className="text-truncate">
        <div className="ca-tie-rate">{`x${item.data.tieRate}` || "---"}</div>
      </td>
      <td className="text-truncate">
        <div className="ca-date">
          {" "}
          {new Date(item.data.createdAt).toLocaleString()}
        </div>
      </td>
      <td className="text-truncate">
        <ArenaLogsModal data={item.data} />
      </td>
    </tr>
  );
};

export default ClosedArenaTableRow;
