import {
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBBtn,
  MDBModalContent,
  MDBModalDialog,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import logo from "../../assets/images/sidebar/logo.png";
import Swal from "sweetalert2";
import { userInfo } from "../../utility/UserInfo";

const ArenaHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleHideModal = () => {
    setShowModal(false);
  };

  const navigateToDashboard = () => {
    navigate(
      `/dashboard/${userInfo().roleName.toLowerCase()}/arena-moderator/live-arenas`
    );
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/login");
      }
    });
  };

  return (
    <MDBContainer fluid className="px-0 arena-topnav-bg">
      <MDBContainer
        fluid
        className="px-0 d-flex align-items-start justify-content-between"
      >
        <div className="arena-header-logo">
          <img src={logo} alt={logo} className="img-fluid mb-3" />
        </div>
        <div className="arena-tab-container">
          <MDBIcon
            onClick={navigateToDashboard}
            fas
            icon="home"
            size="xl"
            role="button"
            className="mt-4 me-3"
          />
          {/* <MDBIcon
            fas
            icon="sign-out-alt"
            size="xl"
            role="button"
            className="mt-4 me-3"
            onClick={handleLogout}
          /> */}
        </div>
        <MDBModal
          className="logout-confimation-modal"
          show={showModal}
          onHide={handleHideModal}
        >
          <MDBModalDialog centered size="md">
            <MDBModalContent className="coreq-modal-body py-2">
              <MDBModalBody>
                <p>Are you sure you want to logout?</p>
                <div className="d-flex justify-content-end">
                  <MDBBtn
                    color="secondary"
                    className="mx-3"
                    onClick={handleHideModal}
                  >
                    Cancel
                  </MDBBtn>
                  <MDBBtn color="danger" onClick={handleLogout}>
                    Logout
                  </MDBBtn>
                </div>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ArenaHeader;
