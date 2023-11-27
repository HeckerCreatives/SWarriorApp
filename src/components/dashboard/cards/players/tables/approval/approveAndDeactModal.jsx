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
import { Toaster } from "react-hot-toast";
import useProfileStore from "../../../../../../stores/profileStore";
import { commisionRate } from "../../../../../../utility/commsRate";
import useAgentStore from "../../../../../../stores/agentStore";
import { useRef } from "react";

const ApproveAndDeactModal = ({ agent }) => {
  const [approveModal, setCentredApproveModal] = useState(false);
  const [rejectModal, setCentredRejectModal] = useState(false);

  const toggleShowApprove = () => setCentredApproveModal(!approveModal);
  const toggleShowReject = () => setCentredRejectModal(!rejectModal);

  const profile = useProfileStore(state => state.profile);
  const approve = useAgentStore(state => state.agentApproveAgent);
  const reject = useAgentStore(state => state.agentBanUser);
  const appLoads = useAgentStore(state => state.loading.approve);
  const rejLoads = useAgentStore(state => state.loading.ban);

  const reset = useAgentStore(state => state.resetSuccess);
  const appSuccess = useAgentStore(state => state.success.approve);
  const rejSuccess = useAgentStore(state => state.success.ban);

  useEffect(() => {
    if (appSuccess || rejSuccess) {
      reset();
      setCentredApproveModal(false);
      setCentredRejectModal(false);
    }
  }, [appSuccess, rejSuccess]);

  const rateRef = useRef(null);

  const handleApprove = () => {
    const appData = {
      userId: agent._id,
      commsRate: rateRef.current.value,
    };
    approve(appData);
  };

  const handleReject = () => {
    reject({
      userId: agent._id,
    });
  };

  return (
    <>
      <Toaster />
      <MDBBtn
        color="success"
        className="pat3r-btn me-2"
        onClick={toggleShowApprove}
      >
        <MDBIcon far icon="check-circle" />
        &nbsp;&nbsp;APPROVE
      </MDBBtn>

      <MDBBtn
        color="danger"
        className="pat3r-btn me-2"
        onClick={toggleShowReject}
      >
        <MDBIcon far icon="times-circle" />
        &nbsp;&nbsp;REJECT
      </MDBBtn>

      <MDBModal
        tabIndex="-1"
        show={approveModal}
        setShow={setCentredApproveModal}
      >
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="pat3-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 pat3-modal-title-approved"
            >
              <MDBIcon fas icon="cogs" /> APPROVING USER
            </MDBTypography>
            <h5 className="mt-4">YOUR CURRENT COMMISSION RATE IS:</h5>
            <h5 className="text-warning">
              {profile.commissionRate.commisionRate}%
            </h5>

            <h5 className="mt-4">
              CURRENT AVAILABLE COMMISSION RATE TO BE GIVEN MUST BE
            </h5>
            <h5 className="text-success">
              {profile.commissionRate.commisionRate - 0.1}%
            </h5>
            <h5 className="mt-0">AND BELOW</h5>
            <MDBBtn
              color="tranparent"
              onClick={toggleShowApprove}
              className="pat3-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer className="pt-3 pb-5 pat3-modal-panel">
                  <MDBTypography tag="h4" className="text-success">
                    {agent.username}
                  </MDBTypography>

                  <div className="d-flex flex-wrap my-3">
                    <div className="flex-grow-1 mx-1 mb-3">
                      <label className="text-white">
                        Please Enter The Commission Rate for This Agent
                      </label>
                      <select
                        className="form-select  cua-input-select-2"
                        name="commissionrate"
                        ref={rateRef}
                        required
                      >
                        <option selected disabled value="">
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
                  <p className={""}>Confirm Message</p>
                </MDBContainer>

                <div className="pat3-modal-warning d-flex align-items-center justify-content-center">
                  <div className="pat3-modal-warning-icon m-0">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="pat3-modal-warning-label">
                    {`Are you sure you want to Approve ${agent.username}?`}
                  </div>
                </div>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  onClick={handleApprove}
                  disabled={appLoads || rejLoads}
                  className="pat3-modal-approve"
                >
                  <MDBIcon fas icon="check" /> APPROVE
                </MDBBtn>
                <MDBBtn
                  onClick={toggleShowApprove}
                  disabled={appLoads || rejLoads}
                  className="pat3-modal-default"
                >
                  <MDBIcon fas icon="times" /> NO
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal
        tabIndex="-1"
        show={rejectModal}
        setShow={setCentredRejectModal}
      >
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="pat3-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 pat3-modal-title-deny"
            >
              <MDBIcon fas icon="cogs" /> REJECTING USER
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShowReject}
              className="pat3-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer className="pt-3 pb-5 pat3-modal-panel">
                  <MDBTypography tag="h4">Username</MDBTypography>
                </MDBContainer>
                <div className="pat3-modal-warning d-flex align-items-center justify-content-center">
                  <div className="pat3-modal-warning-icon m-0">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="pat3-modal-warning-label">
                    {`Are you sure you want to Reject ${agent.username}?`}
                  </div>
                </div>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  onClick={handleReject}
                  disabled={appLoads || rejLoads}
                  className="pat3-modal-deny"
                >
                  <MDBIcon fas icon="check" /> REJECT
                </MDBBtn>
                <MDBBtn
                  className="pat3-modal-default"
                  onClick={toggleShowReject}
                >
                  <MDBIcon fas icon="times" /> NO
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ApproveAndDeactModal;
