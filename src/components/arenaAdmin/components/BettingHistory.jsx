import { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";
import useRoundStore from "../../../stores/roundStore";

const BettingHistory = () => {
  const cols = Array.from(Array(48));
  const [rows, setRows] = useState([]);

  const { state } = useLocation();
  const getRounds = useRoundStore(state => state.getRoundsByArena);
  const rounds = useRoundStore(state => state.rounds);

  useEffect(() => {
    getRounds(state._id);
  }, []);

  useEffect(() => {
    let totalRow = Math.floor(rounds.length / cols.length);
    if (rounds.length % cols.length > 0) totalRow++;
    setRows(Array.from(Array(totalRow > 6 ? totalRow + 1 : 6)));
  }, [rounds]);

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
              key={`${x}-${i}`}
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
                  rounds.length - 1 >= cols.length * x + i &&
                  rounds[cols.length * x + i]?.outcome === "meron"
                    ? "bg-danger"
                    : rounds[cols.length * x + i]?.outcome === "wala"
                    ? "bg-primary"
                    : rounds[cols.length * x + i]?.outcome === "draw"
                    ? "bg-success"
                    : rounds[cols.length * x + i]?.outcome === "cancel" &&
                      "bg-white text-dark"
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
                  {rounds.length - 1 >= cols.length * x + i
                    ? rounds[cols.length * x + i]?.roundNumber
                    : ""}
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
