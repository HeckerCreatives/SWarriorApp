// ** React
import { useEffect } from "react";

// ** Third Party Components
import { MDBContainer, MDBCol, MDBTypography, MDBRow } from "mdb-react-ui-kit";

// ** Redux
import { useDispatch, useSelector } from "react-redux";

const BettingHistory = () => {
  const storeArena = useSelector((state) => state.arena);

  const rows = [];
  let currentRow = [];

  const history = storeArena.arenaGameHistory;

  // Define the number of columns you want to display
  const numColumns = 6;

  // Determine the number of empty columns you need to add
  const numEmptyColumns = numColumns - (history.length % numColumns);

  // Create an array with the necessary number of empty objects
  const emptyColumns = Array(228 + numEmptyColumns).fill({});

  // Add the empty objects to the history array
  const extendedHistory = [...history, ...emptyColumns];

  extendedHistory.forEach((game, index) => {
    const isSameOutcome =
      index > 0 && game.outcome === extendedHistory[index - 1].outcome;

    if (!isSameOutcome && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [];
    }

    currentRow.push(game);

    // create a new row when the current row has reached its maximum length
    if (currentRow.length === 6) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  // add the last row to the rows list
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return (
    <MDBContainer fluid className="px-0 mt-5">
      <MDBContainer fluid className="px-0 topnav-title-container">
        <MDBContainer
          fluid
          className="px-0 topnav-title-container"
          style={{ overflow: "auto" }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              overflow: "auto",
              padding: 0,
            }}
          >
            {rows.map((row, rowIndex) => (
              <div
                className="d-flex align-items-start flex-column col-1"
                style={{ width: "50px" }}
                key={rowIndex}
              >
                {[0, 1, 2, 3, 4, 5].map((columnIndex) => {
                  const game = row[columnIndex];
                  const isEmptyColumn = !game;
                  const outcome = isEmptyColumn ? "" : game.outcome;
                  const round = isEmptyColumn ? "" : game.round;

                  return outcome ? (
                    <div className="betting-columns" key={columnIndex}>
                      <span
                        className={`my-2 square bg-${
                          outcome === "meron"
                            ? "danger"
                            : outcome === "wala"
                            ? "primary"
                            : outcome === "draw"
                            ? "success"
                            : outcome === "cancel"
                            ? "light text-dark"
                            : "secondary"
                        } rounded-circle p-1 text-center mx-2 betting-history-icon`}
                      >
                        {round}
                      </span>
                    </div>
                  ) : (
                    <div className="betting-columns" key={columnIndex}></div>
                  );
                })}
              </div>
            ))}
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  );
};

export default BettingHistory;
