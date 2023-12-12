// ** React

// ** Third Party Components
import { MDBBtn, MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import toast, { Toaster } from "react-hot-toast";

// ** Style
import "./index.css";

// ** Assets
import logo from "../../../assets/images/login/logo.png";
import useAuthStore from "../../../stores/authStore";
import { userInfo } from "../../../utility/UserInfo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const login = useAuthStore(state => state.login);
  const loading = useAuthStore(state => state.loading.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo()?.username) {
      if (userInfo().roleName !== "Player") {
        navigate(`/dashboard/${userInfo().roleName.toLowerCase()}/home`);
        return;
      }
      navigate(`/player/arenaList`);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password } = e.target;

    if (username.value === "" || password.value === "") {
      toast.error("Please enter needed credentials.", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    login({
      username: username.value,
      password: password.value,
    });
  };

  return (
    <MDBContainer
      fluid
      className="px-0 custom-login-bg d-flex align-items-center"
    >
      <Toaster />
      <MDBCol
        xxl={4}
        xl={6}
        lg={6}
        md={6}
        sm={8}
        size={10}
        className="offset-xxl-4 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-2 offset-1 custom-login-panel-container"
      >
        <MDBContainer fluid className="px-0">
          <MDBContainer fluid className="px-0 text-center">
            <img
              src={logo}
              alt="logo"
              width={"150px"}
              className="img-fluid mt-2"
            />
            <MDBContainer
              fluid
              className="custom-login-panel pt-5 px-3 px-md-5 "
            >
              <form autoComplete="off" onSubmit={handleSubmit}>
                <MDBContainer className="custom-login-form py-5">
                  <div className="form-group d-flex align-items-center mb-3 px-2 px-md-5">
                    <label
                      htmlFor="username"
                      className="me-3 text-white custom-login-label"
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      className="form-control custom-login-input"
                      id="username"
                      name="username"
                    />
                  </div>
                  <div className="form-group d-flex align-items-center mb-3 px-2 px-md-5">
                    <label
                      htmlFor="password"
                      className="me-3 text-white custom-login-label"
                    >
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      className="form-control custom-login-input"
                      id="password"
                      name="password"
                    />
                  </div>
                </MDBContainer>

                <div className="my-3">
                  <div className="my-3">
                    <MDBBtn disabled={loading} className="custom-login-btn">
                      {loading ? (
                        <MDBSpinner color="light" size="sm" />
                      ) : (
                        "LOGIN"
                      )}
                    </MDBBtn>
                  </div>
                </div>
              </form>
            </MDBContainer>
          </MDBContainer>
        </MDBContainer>
      </MDBCol>
    </MDBContainer>
  );
};

export default Login;
