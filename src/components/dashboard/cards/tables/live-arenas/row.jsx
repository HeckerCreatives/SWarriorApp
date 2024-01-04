import React, { useEffect } from "react";
import { handleCharLimit, handleDate } from "../../../../../utility/utils";
import CloseArenaModal from "./CloseArenaModal";
import EditArenaModal from "./EditArenaModal";
import { MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import useArenaStore from "../../../../../stores/arenaStore";
import Swal from "sweetalert2";

const LiveArenaTableRow = ({ arena }) => {
  const navigate = useNavigate();

  const controlArena = useArenaStore(state => state.controlArena);
  const reset = useArenaStore(state => state.resetSuccess);
  const loading = useArenaStore(state => state.loading.control);
  const success = useArenaStore(state => state.success?.[`${arena._id}`]);

  const handleControlArena = () => {
    Swal.fire({
      title: `Are you sure you want to control this arena (${arena.eventName})?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        controlArena(arena._id);
      }
    });
  };

  useEffect(() => {
    if (success) {
      reset(arena._id);
      navigate(`/admin/arena/${arena._id}`, { state: arena });
    }
  }, [success]);

  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(arena._id)}</td>
      <td className="text-truncate">{arena.eventName}</td>
      <td className="text-truncate">{arena.fights}</td>
      <td className="text-truncate">{arena.moderator.username}</td>
      <td className="text-truncate">{arena.arenaVideo.name}</td>
      <td className="text-truncate">{arena.eventType}</td>
      <td className="text-truncate">{arena.plasadaRate}</td>
      <td className="text-truncate">
        {arena.drawEnabled ? arena?.tieRate : "N/A"}
      </td>
      <td className="text-truncate">{handleDate(arena.createdAt)}</td>
      <td className="text-truncate">
        <CloseArenaModal data={arena} />
        &nbsp;&nbsp;&nbsp;
        <EditArenaModal data={arena} />
        &nbsp;&nbsp;&nbsp;
        {loading ? (
          <MDBSpinner size="sm" />
        ) : (
          <MDBIcon
            className="text-info shadow-sm la-icon-btn"
            role="button"
            fas
            icon="cogs"
            size="xl"
            onClick={handleControlArena}
          />
        )}
      </td>
    </tr>
  );
};

export default LiveArenaTableRow;
