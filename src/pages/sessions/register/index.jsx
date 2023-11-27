// ** React
import { useEffect, useState } from "react";

// ** Style
import "./index.css";

// ** Third Party Components
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";

import logo from "../../../assets/images/registration/logo.png";
import useUserStore from "../../../stores/userStore";
import { validateRegister } from "../../../utility/validateRegister";
import { errToast } from "../../../utility/toaster";

const Register = () => {
  const navigate = useNavigate();
  const { uid, type } = useParams();
  const getReferrer = useUserStore(state => state.getReferrer);
  const userReferrer = useUserStore(state => state.referrer);

  const create = useUserStore(state => state.registerUser);
  const reset = useUserStore(state => state.resetSuccess);
  const loading = useUserStore(state => state.loading.create);
  const success = useUserStore(state => state.success.create);

  useEffect(() => {
    getReferrer(uid);
  }, []);

  useEffect(() => {
    if (success) {
      document.getElementById("myForm").reset();
      reset();
    }
  }, [success]);

  const handleSubmit = async e => {
    e.preventDefault();
    const { username, email, password1, password2, number, country } = e.target;
    const userData = {
      username: username.value,
      email: email.value,
      password: password1.value,
      confirm: password2.value,
      phonenumber: number.value,
      country: country.value,
      referrer: userReferrer,
      type: type,
    };

    console.log(userData);

    const validate = validateRegister(userData);

    if (!validate.isValid) {
      errToast(validate.msg);
      return;
    }

    create(userData);
  };

  return (
    <MDBContainer
      fluid
      className="custom-register-bg px-0 d-flex align-items-center"
    >
      <Toaster />
      <MDBCol
        xxl={4}
        xl={6}
        lg={6}
        md={6}
        sm={8}
        size={10}
        className="offset-xxl-4 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-2 offset-1 custom-register-panel-container"
      >
        <MDBContainer fluid className="px-0 text-center ">
          <img
            src={logo}
            alt="logo"
            width={"130px"}
            className="img-fluid mt-2"
          />
          <MDBContainer fluid className="px-0 custom-register-panel px-5">
            <MDBTypography className="custom-register-title text-center m-0 py-2">
              REGISTRATION
            </MDBTypography>
            <form id="myForm" onSubmit={handleSubmit} autoComplete="off">
              <MDBContainer className="custom-register-form px-md-5 px-3 py-5">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control custom-register-input"
                    placeholder="USERNAME"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control custom-register-input"
                    placeholder="E-MAIL ADDRESS"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    name="password1"
                    className="form-control custom-register-input"
                    placeholder="PASSWORD"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    name="password2"
                    className="form-control custom-register-input"
                    placeholder="CONFIRM PASSWORD"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="number"
                    name="number"
                    className="form-control custom-register-input"
                    placeholder="MOBILE NUMBER"
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    name="country"
                    className="form-control custom-register-input"
                    placeholder="COUNTRY"
                  />
                </div>
                <div className="form-group custom-referrer-container">
                  <input
                    disabled
                    defaultValue={userReferrer}
                    type="text"
                    className="form-control custom-register-input"
                  />
                </div>
              </MDBContainer>

              <div className="my-3">
                <MDBBtn disabled={loading} className="custom-register-btn">
                  {loading ? <MDBSpinner size="sm" color="dark" /> : "PROCEED"}
                </MDBBtn>
              </div>
            </form>
            <div>
              <MDBBtn
                onClick={() => navigate("/login")}
                color="transparent"
                className="p-0 shadow-0 fw-bold fs-6 mb-2 mt-2 text-capitalize"
              >
                Already have an account?
              </MDBBtn>
            </div>
          </MDBContainer>
        </MDBContainer>
      </MDBCol>
    </MDBContainer>
  );
};

export default Register;
