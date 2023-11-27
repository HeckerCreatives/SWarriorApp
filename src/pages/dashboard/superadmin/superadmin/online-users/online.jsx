import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const OnlineUsersList = () => {
  return (
    <MDBCol className="ou-card-wrapper p-2 mb-3">
      <MDBContainer fluid className="p-3 ou-card-container">
        <MDBContainer fluid className="px-0 ou-card-header">
          <span>
            <MDBIcon fas icon="users" />
            &nbsp;&nbsp;Online Users
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 ou-card-body py-4">
          <div className="ou-list-header d-flex align-items-center justify-content-between py-2 px-3">
            <div>Username</div>
            <div>Actions</div>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default OnlineUsersList;
