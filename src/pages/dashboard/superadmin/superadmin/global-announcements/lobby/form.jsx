import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBSwitch,
} from "mdb-react-ui-kit";
import React from "react";

const LobbyAnnouncementForm = () => {
  return (
    <MDBCol className="p-2 ga-wrapper mb-3">
      <MDBContainer fluid className="p-3 ga-container">
        <MDBContainer fluid className="px-0 py-2 ga-header">
          <span>
            <MDBIcon fas icon="globe" />
            &nbsp;&nbsp;Lobby Announcement
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 ga-body mt-3">
          <div className="ga-body-title py-2">
            <span>
              <MDBIcon fas icon="bell" />
              &nbsp;&nbsp;REMINDER
            </span>
          </div>
          <div className="py-3">
            <textarea
              className="form-control ga-input-textarea shadow-0"
              rows="5"
              value="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem veritatis quidem facilis debitis corporis delectus
              ullam accusantium culpa. Ab, quisquam temporibus? Rem non
              accusamus repellat, libero facere accusantium unde voluptatem."
            ></textarea>
          </div>
          <div className="d-flex align-items-center text-white fw-bold">
            <MDBSwitch className="me-3" /> <small>Hide</small>
          </div>
          <div className="mt-3">
            <MDBBtn color="warning" className="fw-bold">
              <MDBIcon far icon="save" />
              &nbsp;&nbsp;SAVE
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default LobbyAnnouncementForm;
