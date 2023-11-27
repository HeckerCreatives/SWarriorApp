import React from "react";

const LiveArenaTableRow = ({
  data,
  index,
  selectedIndex,
  setSelectedIndex,
  onClickRow,
}) => {
  const isSelected = index === selectedIndex;

  const style = {
    backgroundColor: "#d0e0e3",
    color: "#333",
    transition: "all 0.3s",
  };

  return (
    <tr
      className="text-center"
      role="button"
      onClick={() => {
        setSelectedIndex(selectedIndex === index ? -1 : index);
        onClickRow(selectedIndex === index ? [] : data);
      }}
      style={isSelected ? style : {}}
    >
      <td className="text-truncate">{data.id}</td>
      <td className="text-truncate">150</td>
      <td className="text-truncate">SYSTEM</td>
      <td className="text-truncate">{data.eventName || "---"}</td>
      <td className="text-truncate">{data.eventType || "---"}</td>
      <td className="text-truncate">{`${data.plasadaRate}%` || "---"}</td>
      <td className="text-truncate">{`x${data.tieRate}` || "---"}</td>
      <td className="text-truncate">
        {new Date(data.createdAt).toLocaleString()}
      </td>
    </tr>
  );
};

export default LiveArenaTableRow;
