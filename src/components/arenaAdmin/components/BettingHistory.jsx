// ** React
import { useEffect } from "react";

// ** Third Party Components
import { MDBContainer, MDBCol, MDBTypography } from "mdb-react-ui-kit";

// ** Redux
import { useDispatch, useSelector } from "react-redux";

const BettingHistory = () => {
  const storeArena = useSelector((state) => state.arena);

  const rows = [];
  const history = storeArena.arenaGameHistory;

  // Define the number of columns you want to display
  const numColumns = 6;

  // Determine the number of empty columns you need to add
  const numEmptyColumns = numColumns - (history.length % numColumns);

  // Create an array with the necessary number of empty objects
  const emptyColumns = Array(228 + numEmptyColumns).fill({});

  // Add the empty objects to the history array
  const extendedHistory = [...history, ...emptyColumns];

  for (let i = 0; i < 6; i++) {
    const cols = [];
    const lastOutcome = [];

    for (let j = i; j < extendedHistory.length; j += 6) {
      cols.push(
        <MDBCol
          className="betting-columns"
          size="1"
          key={extendedHistory[j].id}
        >
          <span
            className={`square bg-${
              extendedHistory[j].outcome === "meron"
                ? "danger"
                : extendedHistory[j].outcome === "wala"
                ? "primary"
                : extendedHistory[j].outcome === "draw"
                ? "success"
                : extendedHistory[j].outcome === "cancel"
                ? "light text-dark"
                : ""
            } rounded-circle p-1 text-center mx-2 betting-history-icon`}
          >
            {extendedHistory[j].round}
          </span>
        </MDBCol>
      );
    }

    // for (let j = i; j < 2; j += 6) {
    //   cols.push(
    //     <MDBCol
    //       className="betting-columns"
    //       size="1"
    //       // key={storeArena.arenaGameHistory[j].id}
    //     ></MDBCol>
    //   );
    // }

    rows.push(
      <div className="d-flex" key={i}>
        {cols}
      </div>
    );
  }

  return (
    <MDBContainer fluid className="px-0">
      {/* <MDBContainer fluid className="px-0 custom-topnav-bg">
        <MDBContainer fluid className="px-0 mb-5">
          <MDBCol
            xxl={2}
            xl={4}
            lg={4}
            md={5}
            sm={6}
            size={8}
            className="offset-xxl-10 offset-xl-8 offset-lg-8 py-2 offset-md-7 offset-sm-6 offset-4 topnav-tab-container"
          ></MDBCol>
        </MDBContainer>
        <MDBContainer
          fluid
          className="px-0 topnav-title-container ps-4 pt-2 betting-history-main-container"
        >
          <MDBTypography tag="h3" className="text-warning">
            Betting History
          </MDBTypography>
          <div className="betting-colors-container">
            <div className="d-flex align-items-center mx-2 my-2">
              <span className="square bg-danger rounded-circle p-1 text-center  betting-history-icon mx-2">
                M
              </span>
              <p className="text-center m-0 text-danger">Meron</p>
            </div>
            <div className="d-flex align-items-center mx-2 my-2">
              <span className="square bg-primary rounded-circle p-1 text-center  betting-history-icon mx-2">
                W
              </span>
              <p className="text-center m-0 text-primary">Wala</p>
            </div>
            <div className="d-flex align-items-center mx-2 my-2">
              <span className="square bg-success rounded-circle p-1 text-center  betting-history-icon mx-2">
                D
              </span>
              <p className="text-center m-0 text-success">Draw</p>
            </div>
            <div className="d-flex align-items-center mx-2 my-2">
              <span className="square bg-light rounded-circle p-1 text-center  betting-history-icon mx-2 text-dark">
                C
              </span>
              <p className="text-center m-0 text-light">Cancel</p>
            </div>
          </div>
        </MDBContainer>
      </MDBContainer> */}
      <MDBContainer
        fluid
        className="px-0 topnav-title-container"
        style={{ overflow: "auto" }}
      >
        {rows ? rows : <h1>There is currently no betting history.</h1>}
      </MDBContainer>
    </MDBContainer>
  );
};

export default BettingHistory;
