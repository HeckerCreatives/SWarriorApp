// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import parse from "html-react-parser";

const TestVideoPlayerModal = ({ data }) => {
  // ** Vars
  const [centredModal, setCentredModal] = useState(false);
  const [url, setUrl] = useState("");

  const toggleShow = () => {
    console.log(centredModal);
    if (!centredModal) setUrl(data.url);
    if (centredModal) setUrl("");
    setCentredModal(!centredModal);
  };

  return (
    <>
      <MDBBtn
        className="cvitem-btn cvitem-btn-1"
        onClick={toggleShow}
        role="button"
      >
        <MDBIcon fas icon="play" /> TEST PLAY
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered className="cvlist-modal-custom-maxwidth">
          <MDBModalContent
            className="coreq-modal-body py-2"
            style={{ height: "800px" }}
          >
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> Test Video Player
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                {/* <MDBContainer fluid className="px-0 mb-5">
                  <MDBTypography tag="h5" className="text-white">
                    <small>Low Latency Code</small>
                  </MDBTypography>
                  <div className="cvlist-iframe-container">
                    {parse(data?.lowLatencyCode || "")}
                  </div>
                </MDBContainer> */}
                <MDBContainer fluid className="px-0 mb-3">
                  <MDBTypography tag="h5" className="text-white">
                    <small>Compatibility Mode Code</small>
                  </MDBTypography>
                  <div
                    className="cvlist-iframe-container py-5"
                    style={{ height: "600px" }}
                  >
                    {parse(url || "")}
                  </div>
                </MDBContainer>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default TestVideoPlayerModal;
