import { MDBCol, MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const CommsByDateCard = ({
  title,
  value,
  icon,
  sub,
  xxl,
  xl,
  lg,
  md,
  sm,
  size,
  loading = false,
}) => {
  return (
    <MDBCol
      xxl={xxl || 6}
      xl={xl || 6}
      lg={lg || 6}
      md={md || 6}
      sm={sm || 6}
      size={size}
      className={`${
        size ? `offset-xxl-3 offset-xl-3 my-4 offset-lg-2 offset-md-2` : ``
      }my-2`}
    >
      <MDBContainer fluid className="px-0 py-2 cbd-header d-flex flex-column">
        <span className="ms-3">
          <MDBIcon fas icon={icon} />
          &nbsp;&nbsp;{title}
        </span>
        <small className="ms-3">{sub}</small>
      </MDBContainer>
      <MDBContainer fluid className="px-0 py-3 text-center cbd-body">
        {loading ? <MDBSpinner size="sm" /> : value}
      </MDBContainer>
    </MDBCol>
  );
};

export default CommsByDateCard;
