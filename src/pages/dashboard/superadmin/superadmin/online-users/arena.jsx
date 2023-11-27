import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const SelectArena = () => {
  return (
    <MDBCol className="ou-card-wrapper p-2 mb-3">
      <MDBContainer fluid className="p-3 ou-card-container">
        <MDBContainer fluid className="px-0 ou-card-header">
          <span>
            <MDBIcon fas icon="warehouse" />
            &nbsp;&nbsp;Select Arena
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 ou-card-body">
          <div className="py-4">
            <select
              className="form-select ou-input-select shadow-0"
              aria-label="Default select example"
            >
              <option selected>Please select Arena</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default SelectArena;
