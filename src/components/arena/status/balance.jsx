import { MDBContainer, MDBSpinner, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import RequestCashoutModal from "./RequestCashoutModal";
import useUserStore from "../../../stores/userStore";

const ArenaBalanceAmount = () => {
  const points = useUserStore(state => state.points);
  const loading = useUserStore(state => state.loading.points);

  return (
    <MDBContainer
      fluid
      className="px-0 mb-2 mt-2 d-flex align-items-center justify-content-between"
    >
      <MDBContainer
        fluid
        className="p-1 text-white text-center d-flex align-items-center justify-content-start flex-grow-1 gap-2"
        style={{ fontSize: "1rem" }}
      >
        <span>CREDIT POINTS:</span>
        <MDBTypography
          tag="h6"
          className="text-center m-0 text-warning fw-bolder"
        >
          {loading ? <MDBSpinner size="sm" /> : Number(points).toFixed(2)}
        </MDBTypography>
      </MDBContainer>
      <RequestCashoutModal />
    </MDBContainer>
  );
};

export default ArenaBalanceAmount;
