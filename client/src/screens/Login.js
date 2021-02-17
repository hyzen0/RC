import { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  UncontrolledAlert,
} from "reactstrap";
import axios from "axios";
import { authenticate, isAuth } from "../helpers/auth";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { FiLogIn } from "react-icons/fi";
import login from "../assets/login.svg";

const clientId =
  "594668924560-p1bn7a6rqdqlcu547hsu0hlrlu53qlln.apps.googleusercontent.com";

const Login = ({ history }) => {
  const [msg, setMsg] = useState({ color: "", message: "" });
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    textChange: (
      <>
        <FiLogIn fontSize="20" /> Sign In
      </>
    ),
  });

  const { email, password1, textChange } = formData;

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = tokenId => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/googlelogin`, {
        idToken: tokenId,
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
        window.location.reload(true);
      })
      .catch(error => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };

  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin/")
        : history.push("/user/profile/");
    });
  };

  const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const handleSubmit = e => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({
        ...formData,
        textChange: (
          <>
            <Spinner color="light" size="sm" /> Signing In...
          </>
        ),
      });
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/login`, {
          email,
          password: password1,
        })
        .then(res => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: "",
              password1: "",
              textChange: "Signed In",
            });
            isAuth() && isAuth().role === "admin"
              ? history.push("/admin/")
              : history.push("/user/profile/");
            toast.success(`Welcome ${res.data.user.name}!`);
            window.location.reload(true);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: "",
            password1: "",
            textChange: "Sign In",
          });
          console.log(err.response);
          setMsg({
            color: "danger",
            message: err.response.data.errors,
          });

          setTimeout(() => {
            setMsg({ color: "", message: "" });
          }, 3000);
        });
    } else {
      setMsg({
        color: "danger",
        message: "Please fill all fields!",
      });

      setTimeout(() => {
        setMsg({ color: "", message: "" });
      }, 3000);
    }
  };

  return (
    <section className="container-fluid">
      {isAuth() ? <Redirect to="/" /> : null}
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          {(msg.color && msg.message) === "" ? null : (
            <UncontrolledAlert color={msg.color} fade={false}>
              {msg.message}
            </UncontrolledAlert>
          )}
          <Row>
            <Col md={6} className="order-2 order-sm-1">
              <h2 className="text-center">Sign In</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email" className="mb-1">
                    Email
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                  <Label for="password" className="mb-1">
                    Password
                  </Label>
                  <Input
                    className="p-2"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange("password1")}
                    value={password1}
                  />
                  <Link to="/users/password/forget/" className="">
                    <small>Forgot Password?</small>
                  </Link>
                </FormGroup>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    {textChange}
                  </button>
                </div>
              </Form>

              <div className="text-center pt-2">
                <small className="text-muted">or connect with</small>
                <br />
                <GoogleLogin
                  clientId={clientId}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>

              <div className="text-center pt-3">
                Dont have an account?&nbsp;
                <Link to="/register/" className="text-danger">
                  Sign Up
                </Link>
              </div>
            </Col>
            <Col md={6} className="order-1 order-sm-2">
              <img src={login} alt="signin" className="img-fluid pb-3" />
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default Login;
