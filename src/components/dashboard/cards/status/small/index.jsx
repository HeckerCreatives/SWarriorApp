import { MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const StatusCardSmall = ({ title, value, loading = false }) => {
  return (
    <MDBCol xxl={4} xl={4} lg={6} md={6} sm={12} className="my-2">
      <MDBContainer fluid className="px-0 py-1 status-small-header">
        <span className="ms-3">{title}</span>
      </MDBContainer>
      <MDBContainer fluid className="px-0 py-1 text-center status-small-body">
        {loading ? <MDBSpinner size="sm" /> : value}
      </MDBContainer>
    </MDBCol>
  );
};

export default StatusCardSmall;
