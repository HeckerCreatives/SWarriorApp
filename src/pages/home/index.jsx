import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import LandingHeader from "./header";
import LandingOverview from "./overview";
import LandingBody from "./body";
import LandingNews from "./news";
import LandingGames from "./games";
import LandingNavigation from "./nav"
;

const Homepage = () => {
  return (
    <MDBContainer fluid className="px-0">
      <LandingNavigation />
      <LandingHeader />
      <LandingOverview />
      <LandingBody />
      <LandingNews />
      <LandingGames />
    </MDBContainer>
  );
};

export default Homepage;
