// ** React
import React from "react";

// ** Third Party Components
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

// ** Images
import defaultBackground from "../../assets/images/landing/body/image.png";

const ArenaCard = (item) => {
  // ** Vars
  const navigate = useNavigate();

  console.log(item.data);

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
          <MDBCardTitle>{item.data.eventName}</MDBCardTitle>
          <p className="small text-muted text-uppercase">
            {item.data.eventType}
          </p>{" "}
          <MDBBtn
            onClick={() => navigate(`/player/arena?arena_id=${item.data.id}`)}
          >
            Enter
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>

      {/* <MDBContainer fluid className="cvitem-item py-3">
        <MDBRow className="mx-0 d-flex align-items-center">
          <MDBCol fluid className="col-6">
            <MDBTypography tag="h5" className="text-white m-0">
              {item.data.eventName}
            </MDBTypography>
          </MDBCol>
          <MDBCol fluid className="col-6 text-center">
            <MDBIcon fas icon="door-open text-white" size="2x" />
          </MDBCol>
        </MDBRow>
        <MDBContainer fluid className="px-0"></MDBContainer>
      </MDBContainer> */}
    </MDBCol>
  );
};

export default ArenaCard;
