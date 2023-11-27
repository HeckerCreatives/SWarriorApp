import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import "./index.css";
import PlayerAgentsTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { FIND as USERS } from "../../../../../../redux/slices/users";

const PlayerAgentsTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const storeUsers = useSelector(state => state.users);

  // ** Login User
  const auth = "";

  // ** Filtered Users
  const getAgents = storeUsers.users?.filter(
    x =>
      x.role?.name == "Master" ||
      x.role?.name == "Sub" ||
      x.role?.name == "Gold" ||
      x.role?.name == "Financer"
  );

  useEffect(() => {
    dispatch(USERS(`?referrer=${auth.user.id}`));
  }, []);

  return (
    <MDBCol className="px-3">
      <MDBContainer fluid className="px-0 pat1-table-container h-100">
        <div className="table-responsive">
          <table className="pat1-table h-100">
            <thead>
              <tr className="pat1-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  CREDIT BALANCE
                </th>
                <th scope="col" className="text-truncate">
                  COMMISSION BALANCE
                </th>
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                <th scope="col" className="text-truncate">
                  AGENT LEVEL
                </th>
                <th scope="col" className="text-truncate">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {storeUsers.tableLoader ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : getAgents.length ? (
                getAgents.map((item, i) => (
                  <PlayerAgentsTableRow data={item} key={`tr-${i}`} />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No Result Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default PlayerAgentsTable;
