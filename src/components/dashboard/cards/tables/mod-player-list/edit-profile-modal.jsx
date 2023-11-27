import { useState } from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBContainer,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import d from "../../../../../assets/images/superadmin/d.png";
import useAuthStore from "../../../../../stores/authStore";
import Swal from "sweetalert2";
import { useEffect } from "react";

const PlayerProfileEdit = ({ agent }) => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const change = useAuthStore(state => state.agentChangePassword);
  const reset = useAuthStore(state => state.resetSuccess);
  const loading = useAuthStore(state => state.loading.agentPassword);
  const success = useAuthStore(state => state.success.agentPassword);

  useEffect(() => {
    if (success) {
      document.getElementById("profileForm").reset();
      setCentredModal(false);
      reset();
    }
  }, [success]);

  const handleSubmit = e => {
    e.preventDefault();

    const { password1, password2 } = e.target;

    if (password1.value === "") {
      errToast("Password is required");
      return;
    }

    if (password1.value.length < 6) {
      errToast("Password must be atleast 6 characters");
      return;
    }

    if (password1.value !== password2.value) {
      errToast("Password must match the Confirm password");
      return;
    }

    Swal.fire({
      title: `Are you sure you want to change the password of ${agent.username}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const passwordData = {
          agentId: agent._id,
          agent: agent.username,
          password: password1.value,
          confirm: password2.value,
        };
        change(passwordData);
      }
    });
  };

  return (
    <>
      <Toaster />
      <MDBBtn className="mal-btn" onClick={toggleShow} role="button">
        <img src={d} alt="btn" className="img-fluid mal-btn-img" />
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              USER INFORMATION &<br />
              CHANGE PASSWORD
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
                  <div className="aep-form-panel-container">
                    <div className="aep-form-panel-title">
                      Basic Information & Contact Information
                    </div>
                    <div className="px-3 mb-4">
                      <MDBInput
                        label={<span className="text-white">Username</span>}
                        className="aep-input-text"
                        defaultValue={agent.username}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="new-password"
                        readOnly
                      />
                    </div>
                    <div className="px-3 mb-4">
                      <MDBInput
                        label={<span className="text-white">Full Name</span>}
                        className="aep-input-text"
                        defaultValue={agent.details.fullName}
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="new-password"
                        readOnly
                      />
                    </div>
                    <div className="mx-3 mb-4 position-relative">
                      <MDBIcon far icon="envelope" className="aep-input-icon" />
                      <MDBInput
                        label={
                          <span className="text-white">Email Address</span>
                        }
                        className="aep-input"
                        defaultValue={agent.details.email}
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="new-password"
                        readOnly
                      />
                    </div>
                    <div className="mx-3 mb-4 position-relative">
                      <MDBIcon fas icon="phone" className="aep-input-icon" />
                      <MDBInput
                        label={
                          <span className="text-white">Contact Number</span>
                        }
                        className="aep-input"
                        defaultValue={agent.details.phoneNumber}
                        id="phoneNumber"
                        name="phoneNumber"
                        max="10"
                        type="text"
                        autoComplete="new-password"
                        readOnly
                      />
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    id="profileForm"
                    autoComplete="off"
                  >
                    <div className="aep-form-panel-container">
                      <div className="aep-form-panel-title">
                        Change Password
                      </div>
                      <div className="px-3 mb-4">
                        <MDBInput
                          label={<span className="text-white">Password</span>}
                          className="aep-input"
                          id="password1"
                          name="password1"
                          type="password"
                        />
                      </div>
                      <div className="px-3 mb-4">
                        <MDBInput
                          label={
                            <span className="text-white">Confirm Password</span>
                          }
                          className="aep-input"
                          id="password2"
                          name="password2"
                          type="password"
                        />
                        {/* <span className="aep-form-panel-note">
                          Leave blank if you don't want to change your password.
                        </span> */}
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-3 mt-3 mb-3">
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
                              &nbsp;&nbsp;CHANGE PASSWORD
                            </>
                          )}
                        </MDBBtn>
                      </div>
                    </div>
                  </form>
                </MDBContainer>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PlayerProfileEdit;
