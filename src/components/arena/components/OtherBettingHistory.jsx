import { useEffect, useState } from "react";
import { MDBContainer, MDBCol, MDBTypography, MDBRow } from "mdb-react-ui-kit";
import useRoundStore from "../../../stores/roundStore";

const BettingHistory = () => {
  const cols = Array.from(Array(24));
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
    setRows(Array.from(Array(changed.length)));
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
                  changed.length !== 0 && changed[x][i]
                    ? changed[x][i].outcome === "meron"
                      ? "bg-danger"
                      : changed[x][i].outcome === "wala"
                      ? "bg-primary"
                      : changed[x][i].outcome === "draw"
                      ? "bg-success"
                      : changed[x][i].outcome === "cancel" &&
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
                <span style={{ fontSize: "0.9rem" }}>
                  {changed[x][i] && changed[x][i].roundNumber}
                </span>
              </div>
            </div>
          ))}
        </MDBContainer>
      ))}
    </MDBContainer>
  );
};

export default BettingHistory;
