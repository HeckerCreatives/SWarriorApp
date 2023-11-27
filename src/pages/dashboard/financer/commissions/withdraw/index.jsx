import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import CommsWithdrawalForm from "./form";
import CommsWithdrawalStatus from "./header";
import CommsWithdrawalTable from "./table";
import "./index.css";

const FinCommissionWithdraw = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="COMMISSIONS / Commission Withdraw" />
      <MDBContainer fluid className="px-0 mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={4} xl={5} lg={6}>
            <CommsWithdrawalForm />
          </MDBCol>
          <MDBCol xxl={8} xl={7} lg={6}>
            <CommsWithdrawalStatus />
            <CommsWithdrawalTable />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default FinCommissionWithdraw;
