import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import withdraw from "../../../assets/images/arena/withdraw.png";

import RequestCashoutModal from "./RequestCashoutModal";
import { selectAllNotificationData } from "../../../redux/slices/notification";

import { useDispatch, useSelector } from "react-redux";

const ArenaBalanceAmount = () => {
  const playerBalanceData = useSelector(selectAllNotificationData);
  const dispatch = useDispatch();

  const [balanceValue, setBalanceValue] = useState(0);
  const [updatedBalanceValue, setUpdatedBalanceValue] = useState(0);

  const auth = "";

  useEffect(() => {}, [balanceValue, playerBalanceData]);

  return (
    <MDBContainer fluid className="px-0 mb-2">
      <MDBContainer fluid className="p-1 arena-status-header text-center">
        <span>BALANCE</span>
      </MDBContainer>
      <MDBContainer
        fluid
        className="pt-1 pb-1 arena-status-body position-relative"
      >
        <img
          src={withdraw}
          alt="withdraw"
          className="aba-withdraw-btn"
          role="button"
        />
        <RequestCashoutModal />
        <MDBTypography tag="h3" className="text-center m-0">
          {(
            Math.round(
              !updatedBalanceValue ? balanceValue : updatedBalanceValue
            ) * 1
          ).toFixed(2)}
          {/* {(Math.round((item.amount || 0) * 100) / 100).toFixed(2)} */}
          {/* <button 
          onClick={notifyUser(100)}
          
          disabled={true}>!</button> */}
        </MDBTypography>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ArenaBalanceAmount;
