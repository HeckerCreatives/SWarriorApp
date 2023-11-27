import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import PaymentModeForm from "../../../../../components/dashboard/cards/points/payment/form";
import PaymentModeTable from "../../../../../components/dashboard/cards/points/payment/table";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const MasterPaymentMode = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="MY ACCOUNT / Payment Mode" />
      <MDBContainer fluid className="px-0 mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={5} xl={6} lg={6}>
            <PaymentModeForm />
          </MDBCol>
          <MDBCol xxl={7} xl={6} lg={6}>
            <PaymentModeTable />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default MasterPaymentMode;
