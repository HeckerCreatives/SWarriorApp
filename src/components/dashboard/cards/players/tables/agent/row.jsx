import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const PlayerAgentsTableRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>

      <td className="text-truncate">{item.data.username}WTF!!!</td>
      <td className="text-truncate">{item.data.points}</td>
      <td className="text-truncate">{item.data.commision}</td>
      <td className="text-truncate">{item.data.status}</td>
      <td className="text-truncate">{item.data.role?.name}</td>
      <td className="text-truncate">
        <MDBBtn className="text-warning pat1r-btn shadow-0 me-2">
          <MDBIcon fas icon="user-alt" size="xl" />
        </MDBBtn>
        <MDBBtn className="text-warning pat1r-btn shadow-0 me-2">
          <MDBIcon fas icon="lock" size="xl" />
        </MDBBtn>
        <MDBBtn className="text-success pat1r-btn shadow-0">
          <MDBIcon fas icon="user-check" size="xl" />
        </MDBBtn>
      </td>
    </tr>
  );
};

export default PlayerAgentsTableRow;
