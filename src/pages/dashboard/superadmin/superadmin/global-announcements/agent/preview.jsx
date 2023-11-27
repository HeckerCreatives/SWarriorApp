import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const AgentAnnouncementPreview = () => {
  return (
    <MDBCol className="p-2 ga-wrapper mb-3">
      <MDBContainer fluid className="p-3 ga-container">
        <MDBContainer fluid className="px-0 ga-header">
          <span>
            <MDBIcon fas icon="eye" />
            &nbsp;&nbsp;Agent Announcement Preview
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 ga-body">
          <MDBContainer
            fluid
            className="ga-preview-container-primary d-flex align-items-center my-3 py-3"
          >
            <div className="ga-preview-icon-primary me-3 h-100">
              <MDBIcon fas icon="exclamation-triangle" size="2x" />
            </div>
            <div className="ga-preview-annc flex-grow-1">
              <div className="ga-body-title pb-2 mb-3">
                <span>
                  <MDBIcon fas icon="bullhorn" />
                  &nbsp;&nbsp;ANNOUNCEMENT
                </span>
              </div>
              <div className="ga-preview-body">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Exercitationem veritatis quidem facilis debitis corporis
                delectus ullam accusantium culpa. Ab, quisquam temporibus? Rem
                non accusamus repellat, libero facere accusantium unde
                voluptatem.
              </div>
            </div>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentAnnouncementPreview;
