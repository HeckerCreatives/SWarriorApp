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

const ArenaCard = ({ arena }) => {
  return (
    <MDBCol
      md="6"
      lg="2"
      fluid
      className="p-3 cvitem-wrapper arena-column mb-4"
      style={{ cursor: "pointer" }}
    >
      <MDBCard>
        <MDBCardImage
          src={defaultBackground}
          height={200}
          position="top"
          width={50}
          alt="..."
        />
        <MDBCardBody className="arena-list-item-container">
          <MDBCardTitle>{arena.eventName}</MDBCardTitle>
          <p className="small text-white fw-bold text-uppercase">
            {arena.eventType}
          </p>
          <MDBBtn>Enter</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default ArenaCard;
