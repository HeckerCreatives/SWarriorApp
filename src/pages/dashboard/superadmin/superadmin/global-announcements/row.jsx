import React, { useState } from "react";
import DeleteModal from "./deleteModal";
import ViewModal from "./viewModal";
import EditModal from "./editModal";
import {
  IMAGE_ENDPOINT,
  handleCharLimit,
  handleDate,
} from "../../../../../utility/utils";

const AnnouncementRow = ({ annc }) => {
  const handleCharacter = str => {
    return str.length > 15 ? handleCharLimit(str) : str;
  };

  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(annc._id)}</td>

      <td className="text-truncate">
        <div className="asl-sid">{annc.title}</div>
      </td>
      <td className="text-truncate">
        <img
          src={`${IMAGE_ENDPOINT}${annc.image}`}
          alt="Selected"
          style={{
            maxWidth: "50px",
            minWidth: "50px",
            maxHeight: "50px",
            minHeight: "50px",
            borderRadius: "15px",
            objectFit: "cover",
          }}
        />
      </td>

      <td className="text-truncate">{handleCharacter(annc.description)}</td>
      <td className="text-truncate">{handleDate(annc.createdAt)}</td>
      <td className="text-truncate">
        <ViewModal annc={annc} />
        <DeleteModal annc={annc} />
        <EditModal annc={annc} />
      </td>
    </tr>
  );
};

export default AnnouncementRow;
