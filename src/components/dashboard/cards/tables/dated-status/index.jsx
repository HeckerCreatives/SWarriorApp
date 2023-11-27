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

  useEffect(() => {
    getRegularEarnings();
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
              <td>{reLoads ? <MDBSpinner size="sm" /> : currentMonth}</td>
              <td>{reLoads ? <MDBSpinner size="sm" /> : lastMonth}</td>
            </tr>
            <tr>
              <td>Draw Earnings</td>
              <td>
                {/* <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner> */}
                1
              </td>
              <td>
                {/* <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner> */}
                1
              </td>
            </tr>
            <tr>
              <td>Company Earnings</td>
              <td>
                {/* <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner> */}
                1
              </td>
              <td>
                {/* <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner> */}
                1
              </td>
            </tr>
            <tr>
              <td>Agents Earnings</td>
              <td>
                {/* <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner> */}
                1
              </td>
              <td>
                {/* <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner> */}
                1
              </td>
            </tr>
          </tbody>
        </table>
      </MDBContainer>
    </MDBCol>
  );
};

export default DatedStatusTable;
