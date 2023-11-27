import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import "./index.css";
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const LandingNavigation = () => {
  const links = [
    {
      name: "HOME",
      path: "#home",
    },
    {
      name: "REPORTS",
      path: "#reports",
    },
    {
      name: "ABOUT US",
      path: "#aboutus",
    },
    {
      name: "NEWS",
      path: "#news",
    },
    {
      name: "GAMES",
      path: "#games",
    },
    {
      name: "CONTACT US",
      path: "#contactus",
    },
  ];

  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  return (
    <MDBNavbar
      expand="lg"
      dark
      className=" custom-landing-navbar sticky-top"
      style={{ height: "5rem" }}
    >
      <MDBContainer fluid className="px-0">
        <MDBNavbarBrand href="#" className="mx-2">
          <img
            draggable={false}
            src={logo}
            width={"70px"}
            alt="logo"
            className="img-fluid"
          />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          className="mx-2"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse
          navbar
          show={showNav}
          style={{ backgroundColor: "#000000" }}
        >
          <MDBNavbarNav
            className={`py-2 ${
              window.innerWidth > 990
                ? "d-flex align-items-end justify-content-end"
                : "text-center"
            }`}
          >
            {links.map((link, index) => (
              <MDBNavbarItem key={`links-${index}`} className="mx-2">
                <MDBNavbarLink
                  active
                  aria-current="page"
                  href={link.path}
                  onClick={() => setShowNav(!showNav)}
                  className={`mx-2 custom-link fw-bold `}
                >
                  <div>{link.name}</div>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ))}
            <MDBNavbarItem>
              <MDBNavbarLink
                active
                aria-current="page"
                onClick={() => navigate("/login")}
                className="mx-2 custom-link-btn fw-bold"
              >
                <div>SIGN IN</div>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default LandingNavigation;
