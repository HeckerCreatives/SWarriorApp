// ** React
import { useState, useEffect } from "react";

// ** Third Party Components
import toast from "react-hot-toast";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBIcon,
  MDBModalFooter,
  MDBSpinner,
} from "mdb-react-ui-kit";

import clear from "../../../assets/images/arena/clear.png";
import ArenaDrawAmount from "../status/draw";

const SidePanelBetsMobile = () => {
  const [betAmounts, setBetAmounts] = useState("");

  const handleBetSelection = value => {
    if (value === "max") {
      setBetAmounts(0);
    } else if (value === "clear") {
      setBetAmounts(0);
    } else {
      setBetAmounts(value);
    }
  };

  const handleInputChange = event => setBetAmounts(event.target.value);

  return (
    <MDBCol className="mx-0">
      <MDBRow className="my-3">
        <MDBCol
          xxl={3}
          xl={3}
          lg={3}
          md={4}
          sm={5}
          size={6}
          className="text-center"
        >
          <button
            className="spbets-btn-container p-2 my-2"
            role="button"
            hidden={false}
            disabled={false}
          >
            <div className="spbets-btn-draw">
              <MDBTypography tag="h4" className="m-0">
                BET DRAW
              </MDBTypography>
            </div>
          </button>
        </MDBCol>
        <MDBCol
          xxl={3}
          xl={3}
          lg={3}
          md={4}
          sm={5}
          size={6}
          className="offset-xxl-6 offset-xl-6 offset-lg-6 offset-md-4 offset-sm-2"
        >
          <div
            className="p-2 me-3 ms-0"
            style={{
              borderRadius: "10px",
              border: "2px solid silver",
              background: "#2f3947",
            }}
          >
            <ArenaDrawAmount />
          </div>
        </MDBCol>
      </MDBRow>

      <MDBContainer fluid className="sppayout-container p-3 position-relative">
        <div className="form-group position-relative mb-2">
          <img
            src={clear}
            alt="clear"
            className="img-fluid spbets-btn-clear"
            role="button"
            onClick={() => handleBetSelection("clear")}
          />
          <input
            type="number"
            min="0"
            className="form-control spbets-input-text"
            value={betAmounts}
            onChange={handleInputChange}
          />
        </div>
        <MDBContainer
          fluid
          className="px-0 d-flex align-items-center justify-content-between flex-wrap py-2"
        >
          <MDBBtn
            className="spbets-btn-bet mb-2"
            onClick={() => handleBetSelection(50)}
          >
            50
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            onClick={() => handleBetSelection(500)}
          >
            500
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            onClick={() => handleBetSelection(1000)}
          >
            1k
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            onClick={() => handleBetSelection(2000)}
          >
            2k
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            onClick={() => handleBetSelection(5000)}
          >
            5k
          </MDBBtn>
          <MDBBtn
            className="spbets-btn-bet mb-2"
            onClick={() => handleBetSelection("max")}
          >
            MAX
          </MDBBtn>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelBetsMobile;
