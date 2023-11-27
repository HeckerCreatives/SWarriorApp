import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import GeneralSettings from "./general";
import "./index.css";
import RealtimeControls from "./real-time";
import CredentialSecurity from "./security";

const SiteSettings = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="SUPER ADMIN / Site Settings" />
      <MDBContainer fluid className="mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={6} xl={6} lg={5} className="px-2">
            <GeneralSettings />
          </MDBCol>
          <MDBCol xxl={6} xl={6} lg={7} className="px-2">
            <RealtimeControls />
            <CredentialSecurity />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default SiteSettings;
