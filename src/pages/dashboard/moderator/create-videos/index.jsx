import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import CreateVideoForm from "../../../../components/dashboard/cards/create-videos/form";
import CreateVideoHeader from "../../../../components/dashboard/cards/create-videos/header";
import CreateVideoList from "../../../../components/dashboard/cards/create-videos/list";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";

const ModCreateVideos = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="ARENA MODERATOR / Create Arenas" />
      <MDBRow className="mx-0 mt-2">
        <CreateVideoForm />
        <MDBCol xxl={8} xl={8} lg={7}>
          <CreateVideoHeader />
          <CreateVideoList />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ModCreateVideos;
