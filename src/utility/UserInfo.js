import { jwtDecode } from "jwt-decode";

export const userInfo = () => {
  const token = localStorage.getItem("auth")
    ? jwtDecode(localStorage.getItem("auth"))
    : "";

  return {
    userId: token._id,
    username: token.username,
    roleId: token.roleId,
    roleName: token.roleName,
  };
};
