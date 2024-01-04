import { MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import "./index.css";
import useDashboardStore from "../../../../../stores/dashboardStore";

const DatedStatusTable = () => {
  const getRegularEarnings = useDashboardStore(
    state => state.getRegularEarnings
  );
  const currentMonth = useDashboardStore(
    state => state.regularEarnings.currentMonth
  );
  const lastMonth = useDashboardStore(state => state.regularEarnings.lastMonth);
  const reLoads = useDashboardStore(state => state.loading.regularEarnings);

  const getDrawEarnings = useDashboardStore(state => state.getDrawEarnings);
  const deCurrentMonth = useDashboardStore(
    state => state.drawEarnings.currentMonth
  );
  const deLastMonth = useDashboardStore(state => state.drawEarnings.lastMonth);
  const deLoads = useDashboardStore(state => state.loading.drawEarnings);

  const getCompanyEarnings = useDashboardStore(
    state => state.getCompanyEarnings
  );
  const geCurrentMonth = useDashboardStore(
    state => state.companyEarnings.currentMonth
  );
  const geLastMonth = useDashboardStore(
    state => state.companyEarnings.lastMonth
  );
  const geLoads = useDashboardStore(state => state.loading.companyEarnings);

  const getAgentEarnings = useDashboardStore(state => state.getAgentEarnings);
  const gaCurrentMonth = useDashboardStore(
    state => state.agentEarnings.currentMonth
  );
  const gaLastMonth = useDashboardStore(state => state.agentEarnings.lastMonth);
  const gaLoads = useDashboardStore(state => state.loading.agentEarnings);

  useEffect(() => {
    getRegularEarnings();
    getDrawEarnings();
    getCompanyEarnings();
    getAgentEarnings();
  }, []);

  const handleNumber = amount => Number(amount).toFixed(2);

  return (
    <MDBCol xxl={6} className="mb-2">
      <MDBContainer fluid className="px-0 dated-status-table-container h-100">
        <table className="dated-status-table h-100">
          <thead>
            <tr className="dated-status-line">
              <th scope="col">
                <span className="ms-3">Statistics</span>
              </th>
              <th scope="col">
                <span className="ms-3">Current Month</span>
              </th>
              <th scope="col">
                <span className="ms-3">Last Month</span>
              </th>
            </tr>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Regular Earnings</td>
              <td>
                {reLoads ? (
                  <MDBSpinner size="sm" />
                ) : (
                  handleNumber(currentMonth)
                )}
              </td>
              <td>
                {reLoads ? <MDBSpinner size="sm" /> : handleNumber(lastMonth)}
              </td>
            </tr>
            <tr>
              <td>Draw Earnings</td>
              <td>
                {deLoads ? (
                  <MDBSpinner size="sm" />
                ) : (
                  handleNumber(deCurrentMonth)
                )}
              </td>
              <td>
                {deLoads ? <MDBSpinner size="sm" /> : handleNumber(deLastMonth)}
              </td>
            </tr>
            <tr>
              <td>Company Earnings</td>
              <td>
                {geLoads ? (
                  <MDBSpinner size="sm" />
                ) : (
                  handleNumber(geCurrentMonth)
                )}
              </td>
              <td>
                {deLoads ? <MDBSpinner size="sm" /> : handleNumber(geLastMonth)}
              </td>
            </tr>
            <tr>
              <td>Agents Earnings</td>
              <td>
                {gaLoads ? (
                  <MDBSpinner size="sm" />
                ) : (
                  handleNumber(gaCurrentMonth)
                )}
              </td>
              <td>
                {deLoads ? <MDBSpinner size="sm" /> : handleNumber(gaLastMonth)}
              </td>
            </tr>
          </tbody>
        </table>
      </MDBContainer>
    </MDBCol>
  );
};

export default DatedStatusTable;
