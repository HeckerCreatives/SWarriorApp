// ** React
import { useEffect, useState } from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";

import { useSelector } from "react-redux";

const PreviousOutcomePanel = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const arena_id = urlParams.get("arena_id");
  const storeArena = useSelector(state => state.arena);
  const [previousBet, setPreviousBet] = useState("");

  // const user = JSON.parse(localStorage.getItem('auth'))

  // useEffect(() => {
  //     const fetchPreviousBet = async(user) => {
  //         console.log('this is the current users id', user.user.id)
  //       const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `betting-logs/${arena_id}/${user.user.id}`, {
  //         headers: {'Authorization': `Bearer ${user.jwt}`},

  //     })

  //       const json = await response.json()

  //         if(response.ok) {
  //           console.log('fetchBettinglogsByid', json[json.length -1])
  //           setPreviousBet(json[json.length -1])
  //         }

  //     }

  //     fetchPreviousBet(user)
  // }, [storeArena])
  // console.log('this is the previous outcome', previousBet)

  return (
    <MDBCol>
      <MDBContainer
        fluid
        className="p-3 mt-4 sppayout-container position-relative"
      >
        <div className="sppayout-label px-3">PREVIOUS RESULT</div>
        <MDBCol className="d-flex">
          <MDBContainer className="text-center">
            <h5 className="text-white">Round</h5>
            <span className="text-info">
              {
                storeArena?.arenaGameHistory[
                  storeArena.arenaGameHistory.length - 1
                ]?.round
              }
            </span>
          </MDBContainer>
          <MDBContainer className="text-center">
            <h5 className="text-white">Outcome</h5>
            <span className="text-primary">
              {
                storeArena?.arenaGameHistory[
                  storeArena.arenaGameHistory.length - 1
                ]?.outcome
              }
            </span>
          </MDBContainer>
          <MDBContainer className=" text-center">
            <h5 className="text-white">Status</h5>
            {/* <span className={previousBet.type === "win"?"text-success":"text-danger"}>{previousBet.type}</span> */}
            <span>--</span>
          </MDBContainer>
          {/* <div>asd</div>
        <div>asd</div>
        <div>asd</div> */}
        </MDBCol>
      </MDBContainer>
    </MDBCol>
  );
};

export default PreviousOutcomePanel;
