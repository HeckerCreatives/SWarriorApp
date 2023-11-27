import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React from "react";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import useRoleStore from "../../../../stores/roleStore";
import Swal from "sweetalert2";
import { isUserValid } from "../../../../utility/validateAuthUser";
import { commisionRate } from "../../../../utility/commsRate";
import { errToast } from "../../../../utility/toaster";
import useUserStore from "../../../../stores/userStore";

const CreateUser = () => {
  const roles = useRoleStore(state => state.roles);
  const getRoles = useRoleStore(state => state.getRoles);

  const create = useUserStore(state => state.createAuthoritaiveUser);
  const loading = useUserStore(state => state.loading.create);

  const reset = useUserStore(state => state.resetSuccess);
  const success = useUserStore(state => state.success.create);

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (success) {
      document.getElementById("myForm").reset();
      document.getElementById("role").value = "";
      document.getElementById("commissionrate").value = "";
      setCommissionRateEnabler(true);
      reset();
    }
  }, [success]);

  //useState
  const [commissionRateEnabler, setCommissionRateEnabler] = useState(true);

  const handleChange = evt => {
    const rn = roles.find(e => e._id === evt.target.value);
    setCommissionRateEnabler(rn.name === "Financer" ? false : true);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    Swal.fire({
      title: "Confirm Registration?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(result => {
      if (result.isConfirmed) {
        const role = evt.target.role.value;
        const rn = roles.find(e => e._id === role);

        const userData = {
          username: evt.target.username.value,
          fullname: evt.target.fullname.value,
          email: evt.target.email.value,
          password: evt.target.password1.value,
          confirm: evt.target.password2.value,
          pin: evt.target.pin.value,
          phonenumber: evt.target.phonenumber.value,
          commisionrate: evt.target.commisionrate.value,
          roleId: rn._id,
          roleName: rn.name,
        };

        const validate = isUserValid(userData);

        if (!validate.isValid) {
          errToast(validate.msg);
          return;
        }

        create(userData);
      } else if (result.isDenied) {
        errToast("User creation cancelled.");
      }
    });
  };

  return (
    <MDBCol xxl={6} xl={8} lg={10} className="m-2 p-2 cua-wrapper">
      <MDBContainer fluid className="p-0 cua-container">
        <Toaster />
        <MDBContainer fluid className="px-3 py-3 cua-header">
          <span className="title">
            <MDBIcon fas icon="user-alt" />
            &nbsp;&nbsp;CREATE AUTHORITATIVE USER ACCOUNT
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-4 pb-4 cua-body">
          <form id="myForm" autoComplete="off" onSubmit={handleSubmit}>
            <div className="d-flex flex-wrap my-3">
              <div className="form-group flex-grow-1 mx-1 position-relative mb-3">
                <MDBIcon fas icon="user-alt" className="cua-username-icon" />
                <input
                  type="text"
                  className="form-control cua-input-text cua-input-text-username"
                  placeholder="Username"
                  name="username"
                  required
                />
              </div>
              <div className="form-group flex-grow-1 mx-1">
                <input
                  type="text"
                  className="form-control cua-input-text"
                  placeholder="Full Name (Optional)"
                  name="fullname"
                />
              </div>
            </div>

            <div className="mx-1 my-3">
              <input
                type="email"
                className="form-control cua-input-text-2"
                placeholder="Email"
                name="email"
                required
              />
            </div>

            <div className="d-flex flex-wrap my-3">
              <div className="form-group flex-grow-1 mx-1 mb-3">
                <input
                  type="password"
                  className="form-control cua-input-text"
                  placeholder="Password"
                  name="password1"
                  required
                />
              </div>
              <div className="form-group flex-grow-1 mx-1 mb-3">
                <input
                  type="password"
                  className="form-control cua-input-text"
                  placeholder="Confirm Password"
                  name="password2"
                  required
                />
              </div>
              <div className="form-group flex-grow-1 mx-1 mb-2">
                <input
                  type="password"
                  className="form-control cua-input-text"
                  placeholder="4-Digit PIN"
                  name="pin"
                  maxLength="4"
                  minLength="4"
                  required
                />
              </div>
            </div>

            <div className="mx-1 mt-4 mb-3">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control cua-input-text-2"
                  placeholder="Phone Number"
                  name="phonenumber"
                  maxLength="15"
                  minLength="8"
                  required
                />
              </div>
            </div>

            <div className="d-flex flex-wrap my-3">
              <div
                className="flex-grow-1 mx-1 mb-3"
                hidden={commissionRateEnabler}
              >
                <label className="text-white">Select Commission Rate</label>
                <select
                  className="form-select  cua-input-select-2"
                  name="commisionrate"
                  id="commissionrate"
                >
                  <option selected disabled value="">
                    Enter Commission Rate
                  </option>
                  {commisionRate.map((value, i) => {
                    return (
                      <option key={`comm-rate-${i}`} value={value}>
                        {value}%
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="d-flex flex-wrap my-3">
              <div className="flex-grow-1 mx-1 mb-3">
                <select
                  className="form-select  cua-input-select-2"
                  name="role"
                  id="role"
                  onChange={handleChange}
                >
                  <option selected disabled value="">
                    User Role
                  </option>
                  {roles.map(role => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mx-1">
              <MDBBtn
                disabled={loading}
                color="warning"
                className="w-100 fw-bold "
              >
                {loading ? (
                  <MDBSpinner size="sm" />
                ) : (
                  <>
                    <MDBIcon fas icon="plus" />
                    &nbsp;&nbsp;CREATE USER ACCOUNT
                  </>
                )}
              </MDBBtn>
            </div>
          </form>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default CreateUser;
