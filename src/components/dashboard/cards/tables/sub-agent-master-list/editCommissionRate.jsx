import React from "react";
import { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBContainer,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import { commisionRate } from "../../../../../utility/commsRate";
import Swal from "sweetalert2";
import useAgentStore from "../../../../../stores/agentStore";
import useProfileStore from "../../../../../stores/profileStore";

const AgentEditCommissionRate = ({ agent }) => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const updateComms = useAgentStore(state => state.updateAgentCommsRate);
  const reset = useAgentStore(state => state.resetSuccess);
  const loading = useAgentStore(state => state.loading.commsUpdate);
  const success = useAgentStore(state => state.success.commsUpdate);

  const profile = useProfileStore(state => state.profile);

  useEffect(() => {
    if (success) {
      document.getElementById(`myForm-${agent._id}`).reset();
      toggleShow();
      reset();
    }
  }, []);

  const handleChangeRate = e => {
    e.preventDefault();

    const { commissionrate } = e.target;
    Swal.fire({
      title: `Are you sure you want to change the commission rate of ${agent.username}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const commRateData = {
          agentId: agent._id,
          agent: agent.username,
          commsRate: commissionrate.value,
        };
        updateComms("master", commRateData);
      }
    });
  };

  return (
    <div>
      <Toaster />
      <MDBBtn
        className="bg-light text-dark ms-0 afl-btn afl-btn-1 text-truncate"
        onClick={toggleShow}
      >
        <i className="fas fa-coins me-2"></i> Change Commission Rate
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h4"
              className="text-center  pt-4 coreq-modal-title mb-0"
            >
              <MDBIcon fas icon="coins" className="pe-3" />
              Change Agent Commission Rate <br /> for
              <MDBTypography className="mt-5 mb-0">
                <strong>{agent.username}</strong>
              </MDBTypography>
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer fluid className="p-0 ">
                <MDBContainer fluid className="px-0 py-3 aep-body">
                  <form
                    onSubmit={handleChangeRate}
                    id={`myForm-${agent._id}`}
                    autoComplete="off"
                  >
                    <h2 className="mb-3 text-warning"></h2>
                    <label className="text-white">
                      Current Commission Rate For This Agent is:
                    </label>
                    <h5 className="text-warning">
                      {agent.commissions?.commisionRate}%
                    </h5>
                    <div className="d-flex flex-wrap my-3">
                      <div className="flex-grow-1 mx-1 mb-3">
                        <label className="text-white">
                          Select Commission Rate
                        </label>
                        <select
                          className="form-select  cua-input-select-2"
                          name="commissionrate"
                          required
                        >
                          <option disabled value="">
                            Enter Commission Rate
                          </option>
                          {commisionRate.map(
                            (value, i) =>
                              profile.commissionRate.commisionRate > value && (
                                <option key={`comm-rate-${i}`} value={value}>
                                  {value}%
                                </option>
                              )
                          )}
                        </select>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between px-3 mt-3">
                      <MDBBtn
                        disabled={loading}
                        color="warning"
                        className="fw-bold w-100"
                      >
                        {loading ? (
                          <MDBSpinner size="sm" />
                        ) : (
                          <>
                            <MDBIcon far icon="save" />
                            &nbsp;&nbsp;Save New Commission Rate
                          </>
                        )}
                      </MDBBtn>
                    </div>
                  </form>
                </MDBContainer>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default AgentEditCommissionRate;
