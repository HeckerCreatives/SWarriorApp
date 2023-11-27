import { MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";
import useDashboardStore from "../../../../../stores/dashboardStore";
import { useEffect } from "react";

const OtherStatusTable = () => {
  const getOtherStats = useDashboardStore(state => state.getOtherStats);
  const otherStats = useDashboardStore(state => state.otherStats);
  const loading = useDashboardStore(state => state.loading.otherStats);

  useEffect(() => {
    getOtherStats();
  }, []);

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <MDBCol xxl={6} className="mb-2">
      <MDBContainer fluid className="px-0 other-status-table-container">
        <table className="other-status-table">
          <thead>
            <tr className="other-status-line">
              <th scope="col">
                <span className="ms-3">Other Statistics</span>
              </th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Total System Points
                <br />
                <small>Total Points of all registered users.</small>
              </td>
              <td>
                {loading ? (
                  <MDBSpinner size="sm" />
                ) : (
                  handleNumber(otherStats.systemPoints)
                )}
              </td>
            </tr>
            <tr>
              <td>Total Active Players</td>
              <td>
                {loading ? <MDBSpinner size="sm" /> : otherStats.activePlayers}
              </td>
            </tr>
            <tr>
              <td>Total Active Agents</td>
              <td>
                {loading ? <MDBSpinner size="sm" /> : otherStats.activeAgents}
              </td>
            </tr>
            <tr>
              <td>Total Cash-ins</td>
              <td>
                {loading ? (
                  <MDBSpinner size="sm" />
                ) : (
                  handleNumber(otherStats.cashins)
                )}
              </td>
            </tr>
            <tr>
              <td>Total Cashout</td>
              <td>
                {loading ? (
                  <MDBSpinner size="sm" />
                ) : (
                  handleNumber(otherStats.cashouts)
                )}
              </td>
            </tr>
            <tr>
              <td>Total Blocked Users</td>
              <td>
                {loading ? <MDBSpinner size="sm" /> : otherStats.blockedUsers}
              </td>
            </tr>
          </tbody>
        </table>
      </MDBContainer>
    </MDBCol>
  );
};

export default OtherStatusTable;
