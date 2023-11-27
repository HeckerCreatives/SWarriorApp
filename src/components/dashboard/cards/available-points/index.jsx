// ** Third Party Components
import { MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import React from "react";
import "./index.css";
import CashInPoints from "./modal";

const AvailablePoints = ({ value, loading = false }) => {
  return (
    <MDBCol
      xxl={6}
      xl={6}
      lg={8}
      md={8}
      sm={12}
      size={12}
      className="offset-xxl-3 offset-xl-3 offset-lg-2 offset-md-2 my-2 "
    >
      <Toaster />
      <MDBContainer fluid className="px-0 py-2 available-points-header">
        <span className="ms-4">Available Points</span>
      </MDBContainer>
      <MDBContainer
        fluid
        className="px-0 py-2 text-center available-points-body"
      >
        {loading ? <MDBSpinner size="sm" /> : value}
        <CashInPoints />
      </MDBContainer>
    </MDBCol>
  );
};

export default AvailablePoints;
