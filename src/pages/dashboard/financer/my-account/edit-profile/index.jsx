import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import AgentEditProfile from "../../../../../components/dashboard/cards/points/edit-profile";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const FinEditProfile = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="MY ACCOUNT / Edit Profile" />
      <MDBContainer fluid className="px-2 mt-2 pb-2">
        <AgentEditProfile />
      </MDBContainer>
    </MDBContainer>
  );
};

export default FinEditProfile;
