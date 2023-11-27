import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";
import slogan from "../../../assets/images/landing/header/slogan.png";
import { useNavigate } from "react-router-dom";

const LandingHeader = () => {
  const navigate = useNavigate();
  return (
    <MDBContainer
      id="home"
      fluid
      className="px-0 section-size landing-header-bg"
    >
      <MDBCol>
        <MDBContainer className="d-flex flex-column align-items-center justify-content-center vh-100">
          <img src={slogan} alt="slogan" className="img-fluid mb-5" />
          <MDBBtn className="lh-btn shadow-0" onClick={() => navigate("/login")}>
            GET STARTED <MDBIcon fas icon="angle-right" />
          </MDBBtn>
        </MDBContainer>
      </MDBCol>
    </MDBContainer>
  );
};

export default LandingHeader;
