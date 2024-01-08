import { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import useRoundStore from "../../../stores/roundStore";

const BettingHistory = () => {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const rounds = useRoundStore(state => state.rounds);
  const [changed, setChanged] = useState([]);

  useEffect(() => {
    const updateResultArray = () => {
      const newArray = [];
      let current = [];

      rounds.forEach(round => {
        const outcome = round.outcome;

        if (
          current.length === 0 ||
          current[current.length - 1].outcome === outcome
        ) {
          current.push(round);
        } else {
          newArray.push(current);
          current = [round];
        }
      });

      if (current.length > 0) {
        newArray.push(current);
      }
      setChanged(newArray);
    };

    updateResultArray();
  }, [rounds]);

  useEffect(() => {
    let maxLength = 0;
    for (let i = 0; i < changed.length; i++) {
      let current = changed[i].length;
      if (current > maxLength) {
        maxLength = current;
      }
    }
    setRows(Array.from(Array(maxLength + 1)));
    setCols(
      Array.from(Array(changed.length + 1 < 48 ? 48 : changed.length + 1))
    );
  }, [changed]);

  return (
    <MDBContainer
      fluid
      className="px-0"
      style={{ overflow: "auto", maxHeight: "20rem" }}
    >
      {rows.map((row, x) => (
        <MDBContainer
          key={x}
          fluid
          className="p-0 m-0 topnav-title-container d-flex"
        >
          {cols.map((col, i) => (
            <div
              key={i}
              style={{
                height: "3.25rem",
                width: "3.25rem",
                minHeight: "3.25rem",
                minWidth: "3.25rem",
              }}
              className="border d-flex align-items-center justify-content-center"
            >
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center
                ${
                  changed.length !== 0 && changed[i] && changed[i][x]
                    ? changed[i][x].outcome === "meron"
                      ? "bg-danger"
                      : changed[i][x].outcome === "wala"
                      ? "bg-primary"
                      : changed[i][x].outcome === "draw"
                      ? "bg-success"
                      : changed[i][x].outcome === "cancel" &&
                        "bg-white text-dark"
                    : null
                }
                `}
                style={{
                  minHeight: "2.5rem",
                  minWidth: "2.5rem",
                  height: "2.5rem",
                  width: "2.5rem",
                }}
              >
                {changed[i] && changed[i][x] && (
                  <div
                    className={`${
                      changed.length !== 0 &&
                      changed[i] &&
                      changed[i][x] &&
                      changed[i][x].outcome !== "cancel"
                        ? "bg-white"
                        : "bg-dark"
                    } rounded-pill`}
                    style={{
                      minHeight: "1rem",
                      minWidth: "1rem",
                      height: "1rem",
                      width: "1rem",
                    }}
                  />
                )}

                {/* {changed[i] && changed[i][x] && changed[i][x]?.roundNumber} */}
              </div>
            </div>
          ))}
        </MDBContainer>
      ))}
    </MDBContainer>
  );
};

export default BettingHistory;
