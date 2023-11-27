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

const ArenaHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
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
      } else if (result.isDenied) {
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
            fas
            icon="sign-out-alt"
            size="xl"
            role="button"
            className="mt-4 me-3"
            onClick={handleShowModal}
          />
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
