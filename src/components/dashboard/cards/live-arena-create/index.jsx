// ** React
import { useEffect } from "react";

// ** Style
import "./index.css";

// ** Third Party Components
import { Toaster } from "react-hot-toast";
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// Modals
import CreateArena from "./modal";

const LiveArenasCreate = () => {
  return (
    <MDBCol className="px-3 my-3">
      <Toaster />
      <MDBContainer
        fluid
        className="live-arena-header d-flex align-items-center justify-content-between py-2"
      >
        <div className="live-arena-title">
          <span className="title">LIVE ARENAS</span>
          <br />
          <span className="sub">CURRENT LIVE ARENAS</span>
        </div>
        {/* <div className="text-end live-arena-filter">
          MODERATOR : SuperJom <br />
          <MDBIcon
            fas
            icon="redo-alt"
            size="xl"
            className="text-white"
            role="button"
          />
        </div> */}
      </MDBContainer>
      <MDBContainer
        fluid
        className="live-arena-body d-flex align-items-center justify-content-between py-2"
      >
        <CreateArena />
      </MDBContainer>
    </MDBCol>
  );
};

export default LiveArenasCreate;
