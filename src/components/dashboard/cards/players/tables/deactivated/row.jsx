import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { handleCharLimit, handleDate } from "../../../../../../utility/utils";
import useAgentStore from "../../../../../../stores/agentStore";
import { useEffect } from "react";
import Swal from "sweetalert2";

const PlayerDeactivatedTableRow = ({ agent }) => {
  const reactivate = useAgentStore(state => state.agentUnbanUser);
  const reset = useAgentStore(state => state.resetSuccess);
  const loading = useAgentStore(state => state.loading.ban);
  const success = useAgentStore(state => state.success.ban);

  useEffect(() => {
    reset();
  }, [success]);

  const handleUnban = () => {
    Swal.fire({
      title: `Are you sure you want to re-activate ${agent.username}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const banData = {
          userId: agent._id,
        };
        reactivate(banData);
      }
    });
  };

  return (
    <tr className="text-center">
      <td className="text-truncate">{handleCharLimit(agent._id)}</td>

      <td className="text-truncate">{agent.username}</td>
      <td className="text-truncate">{agent.roleName}</td>
      <td className="text-truncate">{handleDate(agent.createdAt)}</td>
      <td className="text-truncate">
        <div className="d-flex align-items-center justify-content-center">
          <MDBBtn
            onClick={handleUnban}
            disabled={loading}
            color="success"
            className="pdtr-btn me-2"
          >
            <MDBIcon fas icon="user-check" />
            &nbsp;&nbsp;RE-ACTIVATE
          </MDBBtn>
          {/* <MDBBtn color="danger" className="pdtr-btn me-2">
            <MDBIcon far icon="times-circle" />
            &nbsp;&nbsp;REJECT
          </MDBBtn> */}
        </div>
      </td>
    </tr>
  );
};

export default PlayerDeactivatedTableRow;
