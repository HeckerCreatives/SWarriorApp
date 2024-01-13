import React from "react";
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import "./index.css";
import { userInfo } from "../../../utility/UserInfo";

const DashboardTopNavigation = ({ title }) => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate(`/dashboard/${userInfo().roleName.toLowerCase()}/home`);
  };

  return (
    <MDBContainer fluid className="px-0 custom-topnav-bg">
      <MDBContainer fluid className="px-0 mb-5">
        <MDBCol
          xxl={2}
          xl={4}
          lg={4}
          md={5}
          sm={6}
          size={8}
          className="offset-xxl-10 offset-xl-8 offset-lg-8 py-2 offset-md-7 offset-sm-6 offset-4 topnav-tab-container"
        >
          <div className="d-flex align-items-center">
            <div className="px-2" onClick={navigateToDashboard}>
              <MDBIcon fas icon="home" size="xl" role="button" />
            </div>
            <div className="px-4" onClick={() => window.location.reload()}>
              <MDBIcon fas icon="redo-alt" size="xl" role="button" />
            </div>
          </div>
        </MDBCol>
      </MDBContainer>
      <MDBContainer fluid className="px-0 topnav-title-container ps-4 my-0 p-2">
        {title}
      </MDBContainer>
    </MDBContainer>
  );
};

export default DashboardTopNavigation;
