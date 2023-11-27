import React, { useState } from "react";
import "./index.css";
import logo from "../../../assets/images/sidebar/logo.png";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DashboardSidebar = ({ links, didToggle, setDidToggle }) => {
  const [toggled, setToggled] = useState("");
  const navigate = useNavigate();
  const activePath = window.location.pathname;

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

  const checkActive = link => {
    let newStyle = "";
    if (link.children.length === 0) {
      newStyle = activePath === link.path ? "sidebar-active-link" : "";
    } else {
      const newarray = link.children.map(l => l.path);
      newStyle = newarray.includes(activePath) ? "sidebar-active-link-2" : "";
    }
    return newStyle;
  };

  return (
    <div
      className={`sidebar-wrapper d-flex flex-column ${
        window.innerWidth < 768 && didToggle && "overflow-auto"
      }`}
      style={{
        width: didToggle
          ? window.innerWidth < 768
            ? "0rem"
            : "4.5rem"
          : "20rem",
      }}
    >
      {window.innerWidth > 768 && (
        <div
          onClick={() => {
            setDidToggle(!didToggle);
            setToggled("");
          }}
          className={`sidebar-toggle d-flex align-items-center justify-content-center ${
            didToggle && "sidebar-toggle-rotate"
          }`}
        >
          <MDBIcon fas icon="angle-left" size="lg" />
        </div>
      )}

      <div className="sidebar-header pt-4 mb-2">
        <div className="text-center sidebar-logo-container d-flex align-items-center justify-content-center">
          <img src={logo} alt="logo" className="img-fluid w-50" />
        </div>
        <div className="text-center pt-3">
          {/* <MDBBtn
            color="transparent"
            className="mb-3 sidebar-arena-btn"
            onClick={() => navigate("/arena")}
          >
            {didToggle ? (
              <MDBIcon fas icon="warehouse" title="Arena" />
            ) : (
              "Arena"
            )}
          </MDBBtn> */}
        </div>
      </div>
      <div className="sidebar-body flex-grow-1">
        {links.map((link, i) => (
          <div key={`link-${i}`}>
            <div
              onClick={() => {
                if (link.name !== toggled) {
                  setToggled(link.name);
                  link.children?.length !== 0 && setDidToggle(false);
                } else {
                  setToggled("");
                  link.children?.length !== 0 && setDidToggle(false);
                }
                link.path !== "" && navigate(link.path);
                link.path !== "" &&
                  window.innerWidth < 768 &&
                  setDidToggle(!didToggle);
              }}
              className={`d-flex align-items-center py-2 mt-2 sidebar-link-header cursor-pointer ${checkActive(
                link
              )}`}
            >
              <div className="sidebar-icon-container">
                <MDBIcon fas icon={link.icon} size="xl" title={link.name} />
              </div>
              <div className="flex-grow-1 sidebar-link-header-title">
                {link.name}
              </div>
              <div
                className={`mx-3 ${link.children.length === 0 && "opacity-0"}`}
              >
                {link.name === toggled ? (
                  <MDBIcon fas icon="angle-up" size="lg" />
                ) : (
                  <MDBIcon fas icon="angle-down" size="lg" />
                )}
              </div>
            </div>
            <div
              className={`sidebar-sub-link ${
                toggled === link.name && "sidebar-sub-link-active"
              }`}
            >
              {link.path === "" &&
                link.children.map((sub, i) => (
                  <div
                    className={`d-flex align-items-center py-1 my-1 sidebar-link-header ms-3 ${
                      activePath === sub.path && "sidebar-active-link"
                    }`}
                    key={`sub-${i}`}
                    onClick={() => {
                      navigate(sub.path);
                      window.innerWidth < 768 && setDidToggle(!didToggle);
                    }}
                  >
                    <div className="mx-3">
                      <MDBIcon fas icon="angle-right" size="sm" />
                    </div>
                    <div className="flex-grow-1 sidebar-sublink-header-title">
                      {sub.name}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="sidebar-footer py-3">
        <div
          title="Logout"
          className="pe-5 py-0 fs-6 shadow-0 text-warning fw-bold sidebar-logout-btn"
          onClick={handleLogout}
        >
          <MDBIcon fas icon="sign-out-alt" size="xl" className="mx-4" /> LOGOUT
        </div>
      </div>
      {window.innerWidth < 768 && (
        <div
          className="custom-backdrop"
          onClick={() => setDidToggle(!didToggle)}
        />
      )}
    </div>
  );
};

export default DashboardSidebar;
