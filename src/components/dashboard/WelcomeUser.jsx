import React from "react";
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import { userInfo } from "../../utility/UserInfo";

const WelcomeUser = () => {
  return (
    <MDBContainer
      fluid
      className="px-0 topnav-title-container ps-4 mb-2 p-2 text-uppercase"
    >
      WELCOME {`${userInfo().roleName} - ${userInfo().username}`}
    </MDBContainer>
  );
};

export default WelcomeUser;
