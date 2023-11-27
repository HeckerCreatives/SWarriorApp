import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const CurrentWalletCard = ({ title, points, icon, loading = false }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("transferpoints clicked");
  };
  return (
    <MDBCol xxl={6} xl={6} lg={6} className="cwc-wrapper mb-3">
      <MDBContainer fluid className="px-0 cwc-container">
        <MDBContainer
          fluid
          className="p-3 cwc-header d-flex align-items-center justify-content-between"
        >
          <div>
            <MDBIcon fas icon={icon} />
            <span>&nbsp;&nbsp;{title}</span>
          </div>

          {/* <MDBBtn className="commswc-transfer"  onClick={() => navigate(`/dashboard/${user.user.role.description}/my-account/transfer-points`)}>
          <MDBIcon fas icon="wrench" className="pe-1"/>    Manage
          </MDBBtn> */}
        </MDBContainer>
        <MDBContainer fluid className="px-0 cwc-body">
          <div className="py-4">
            <span className="cwc-label">Your Points</span>
            <br />
            <span className="cwc-points">
              {loading ? <MDBSpinner size="sm" /> : points}
            </span>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default CurrentWalletCard;
