import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { socket } from "../../../configs/socket";
import usePlayerArenaStore from "../../../stores/playerArenaStore";

const ArenaHeaderStatus = () => {
  const arena = usePlayerArenaStore(state => state.arena);
  const changeBettingStatus = usePlayerArenaStore(
    state => state.changeBettingStatus
  );

  useEffect(() => {
    socket.on("betting:open", data => {
      changeBettingStatus(data.arenaId, data.bettingStatus);
    });
  }, []);

  useEffect(() => {
    socket.on("betting:close", data => {
      changeBettingStatus(data.arenaId, data.bettingStatus);
    });
  }, []);

  useEffect(() => {
    socket.on("betting:standby", data => {
      changeBettingStatus(data.arenaId, data.bettingStatus);
    });
  }, []);

  return (
    <MDBCol>
      <MDBContainer fluid className="px-0 mb-2">
        <MDBContainer
          fluid
          className="p-1 arena-status-header text-center text-black fs-6"
        >
          <span>Bet Status</span>
        </MDBContainer>
        <MDBContainer
          fluid
          className="pt-2 pb-2 pb-lg-3 pb-xl-2  arena-status-body"
        >
          <MDBTypography
            tag="h6"
            className={`text-center m-0 py-1 text-white rounded-5 ${
              arena?.bettingStatus === "standby"
                ? "bg-primary"
                : arena?.bettingStatus === "close"
                ? "bg-warning"
                : "bg-success"
            }`}
            style={{ textTransform: "uppercase" }}
          >
            {arena?.bettingStatus}
          </MDBTypography>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaHeaderStatus;
