import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import "./index.css";
import image from "../../../assets/images/landing/body/image.png";

const LandingBody = () => {
  return (
    <MDBContainer
      id="aboutus"
      fluid
      className="px-0 section-size-3 body-bg d-flex align-items-center"
    >
      <MDBContainer fluid className="px-5 py-5">
        <MDBRow className="mx-0">
          <MDBCol xxl={6} xl={6} lg={6} className="mb-3">
            <MDBContainer fluid className="px-0">
              <MDBTypography tag="h1" className="text-warning mb-4">
                ABOUT US
              </MDBTypography>
              <MDBTypography tag="p" className="text-white">
                <small>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  sequi commodi iure explicabo recusandae qui rem temporibus
                  iste omnis accusantium dolor atque hic ipsam suscipit neque
                  sit, provident harum iusto.Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Fuga sequi commodi iure
                  explicabo recusandae qui rem temporibus iste omnis accusantium
                  dolor atque hic ipsam suscipit neque sit, provident harum
                  iusto.Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fuga sequi commodi iure explicabo recusandae qui rem
                  temporibus iste omnis accusantium dolor atque hic ipsam
                  suscipit neque sit, provident harum iusto.Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Fuga sequi commodi iure
                  explicabo recusandae qui rem temporibus iste omnis accusantium
                  dolor atque hic ipsam suscipit neque sit, provident harum
                  iusto.
                </small>
              </MDBTypography>
              <MDBRow className="mx-0 mt-3">
                <MDBCol
                  xxl={4}
                  xl={4}
                  lg={4}
                  className="d-flex align-items-center mb-3"
                >
                  <MDBIcon
                    far
                    icon="check-circle"
                    size="2x"
                    className="text-white me-2"
                  />
                  <span className="text-warning fw-bold">HOW TO PLAY</span>
                </MDBCol>
                <MDBCol
                  xxl={4}
                  xl={4}
                  lg={4}
                  className="d-flex align-items-center mb-3"
                >
                  <MDBIcon
                    far
                    icon="check-circle"
                    size="2x"
                    className="text-white me-2"
                  />
                  <span className="text-warning fw-bold">HOW TO CASH IN</span>
                </MDBCol>
                <MDBCol
                  xxl={4}
                  xl={4}
                  lg={4}
                  className="d-flex align-items-center mb-3"
                >
                  <MDBIcon
                    far
                    icon="check-circle"
                    size="2x"
                    className="text-white me-2"
                  />
                  <span className="text-warning fw-bold">HOW TO CASH OUT</span>
                </MDBCol>
              </MDBRow>
              <MDBContainer fluid className="px-0 text-center my-4">
                <MDBBtn className="px-5 py-1 body-btn" color="warning">
                  LEARN MORE
                </MDBBtn>
              </MDBContainer>
            </MDBContainer>
          </MDBCol>
          <MDBCol xxl={6} xl={6} lg={6} className="d-flex align-items-center">
            <MDBContainer fluid className="px-0">
              <img src={image} alt="cockfighting" className="img-fluid" />
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default LandingBody;
