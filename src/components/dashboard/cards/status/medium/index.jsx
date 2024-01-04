import { MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "./index.css";
// import AgentDailyComissions from './AgentsDailyComissions'
// import CompanyDailyCommissions from "./companyDailyCommissions";

const StatusCardMedium = ({ title, value, loading }) => {
  return (
    <MDBCol xxl={4} xl={4} lg={4} className="my-2">
      <MDBContainer fluid className="px-0 py-1 status-medium-header">
        <span className="ms-3">{title}</span>
      </MDBContainer>
      <MDBContainer fluid className="px-0 py-4 text-center status-medium-body">
        {loading ? <MDBSpinner size="sm" /> : value}
      </MDBContainer>
    </MDBCol>
  );
};

export default StatusCardMedium;
