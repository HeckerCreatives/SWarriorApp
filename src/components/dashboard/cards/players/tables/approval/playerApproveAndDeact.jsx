import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// ** Redux
import useAgentStore from "../../../../../../stores/agentStore";
import Swal from "sweetalert2";

const PlayerApproveAndDeactivate = ({ agent }) => {
  const approve = useAgentStore(state => state.agentApprovePlayer);
  const reject = useAgentStore(state => state.agentBanUser);
  const appLoads = useAgentStore(state => state.loading.approve);
  const banLoads = useAgentStore(state => state.loading.ban);

  const reset = useAgentStore(state => state.resetSuccess);
  const appSuccess = useAgentStore(state => state.success.approve);
  const rejSuccess = useAgentStore(state => state.success.ban);

  useEffect(() => {
    if (appSuccess || rejSuccess) {
      reset();
    }
  }, [appSuccess, rejSuccess]);

  const handleApprove = () => {
    Swal.fire({
      title: `Are you sure you want to approve ${agent.username}`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        approve({
          userId: agent._id,
        });
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: `Are you sure you want to reject ${agent.username}`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        reject({
          userId: agent._id,
        });
      }
    });
  };

  return (
    <>
      <Toaster />
      <MDBBtn
        onClick={handleApprove}
        disabled={appLoads || banLoads}
        color="success"
        className="pat3r-btn me-2"
      >
        <MDBIcon far icon="check-circle" />
        &nbsp;&nbsp;APPROVE
      </MDBBtn>

      <MDBBtn
        disabled={appLoads || banLoads}
        onClick={handleReject}
        color="danger"
        className="pat3r-btn me-2"
      >
        <MDBIcon far icon="times-circle" />
        &nbsp;&nbsp;REJECT
      </MDBBtn>
    </>
  );
};

export default PlayerApproveAndDeactivate;
