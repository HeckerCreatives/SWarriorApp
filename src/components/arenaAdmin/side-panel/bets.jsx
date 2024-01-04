import { MDBBtn, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import BettingStatus from "./component/BettingStatus";
import DeclareResult from "./component/DeclareResult";
import NextRound from "./component/NextRound";
import UpdateRound from "./component/UpdateRound";

const SidePanelBets = () => {
  return (
    <MDBContainer
      fluid
      className="pt-5 pb-5 px-3 mt-5 mb-1 sppayout-container position-relative"
    >
      {/* <Toaster /> */}
      <div className="sppayout-label px-3">ADMIN CONTROLS:</div>
      <BettingStatus />
      <DeclareResult />
      <NextRound />
      <UpdateRound />
    </MDBContainer>
  );
};

export default SidePanelBets;
