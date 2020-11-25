import { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import login from "../assets/login.svg";
import GoogleLogin from "react-google-login";
import { API } from "../backend";
import { toast } from "react-toastify";
import UserContext from "../components/context/UserContext";
import { useHistory } from "react-router-dom";

// LogIn Form
import SignInForm from "../components/Form/SignInForm";

const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const responseSuccess = response => {
    console.log(response);
    fetch(`${API}google`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "USER", payload: data.tokenId });
        toast("Successfully Logged In!", {
          type: "success",
        });
        history.push("/v1/user/profile");
      });
  };

  const responseFailure = response => {};

  return (
    <Container>
      <Row className="pt-4 justify-content-center align-items-center">
        <Col md={5}>
          <img src={login} alt="login" className="img-fluid" />
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col md={8}>
          <h2 className="text-center">Sign In</h2>
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col className="px-4" md={5}>
          <SignInForm />
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col className="px-4" md={5}>
          <GoogleLogin
            clientId="204747813298-4a065sn8m1rdgo2gq2n4gtmab8mg193l.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseSuccess}
            onFailure={responseFailure}
            cookiePolicy={"single_host_origin"}
          />
        </Col>
      </Row>
      <Row className="justify-content-center pb-3 align-items-center">
        <Col sm={{ size: "auto", offset: 0 }} className="text-center">
          <Link to="/">&#8592; back to home</Link>
        </Col>
        <Col sm={{ size: "auto", offset: 1 }} className="text-center">
          <span className="font-weight-bold">
            Dont have an account?&nbsp;
            <Link to="/signup" className="text-danger">
              Sign Up
            </Link>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
