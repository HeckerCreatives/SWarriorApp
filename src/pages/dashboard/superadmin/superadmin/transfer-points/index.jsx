import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import "./index.css";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import TransferPointsForm from "./form";
import TransferPointsLogsTable from "./table";

const TransferPoints = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="SUPER ADMIN / Transfer Points" />
      <MDBContainer fluid className="px-0 mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={5} xl={5} lg={6}>
            <TransferPointsForm />
          </MDBCol>
          <MDBCol xxl={7} xl={7} lg={6}>
            <TransferPointsLogsTable />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default TransferPoints;
