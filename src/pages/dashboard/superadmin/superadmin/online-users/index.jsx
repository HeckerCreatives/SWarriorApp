import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import Activities from "./activities";
import SelectArena from "./arena";
import "./index.css";
import OnlineUsersList from "./online";

const OnlineUsers = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="SUPER ADMIN / Online Users" />
      <MDBContainer fluid className="px-0 mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={5} xl={5} lg={5}>
            <SelectArena />
            <OnlineUsersList />
          </MDBCol>
          <MDBCol xxl={7} xl={7} lg={7}>
            <Activities />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default OnlineUsers;
