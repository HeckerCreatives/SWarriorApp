import React from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import defaultBackground from "../../assets/images/landing/body/image.png";
import { useNavigate } from "react-router-dom";

const ArenaCard = ({ arena }) => {
  const navigate = useNavigate();

  return (
    <MDBCol
      size={8}
      sm={6}
      md={6}
      lg={4}
      xl={3}
      xxl={3}
      fluid
      className="p-3 cvitem-wrapper arena-column mb-4 mx-1"
      style={{ cursor: "pointer" }}
    >
      <MDBCard>
        <MDBCardImage
          src={defaultBackground}
          height={200}
          position="top"
          width={50}
          alt="..."
          style={{ objectFit: "cover" }}
        />
        <MDBCardBody className="arena-list-item-container">
          <MDBCardTitle className="m-0">{arena.eventName}</MDBCardTitle>
          <p className="small text-white text-uppercase mb-2 mt-0">
            {arena.eventType}
          </p>
          <MDBBtn
            onClick={() =>
              navigate(`/player/arena/${arena._id}`, { state: arena })
            }
            color="warning"
            className="py-1 text-dark fw-bold"
          >
            Enter Arena
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default ArenaCard;
