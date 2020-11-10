import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import login from "../assets/login.svg";

// LogIn Form
import SignInForm from "../components/Form/SignInForm";

const SignIn = () => {
  return (
    <Container>
      <Row className="pt-4 justify-content-center align-items-center">
        <Col md={5}>
          <img src={login} alt="login" className="img-fluid" />
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col md={8}>
          <h3 className="text-center">Sign In</h3>
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col className="px-4" md={5}>
          <SignInForm />
        </Col>
      </Row>
      <Row className="justify-content-center pb-3 align-items-center">
        <Col md={5}>
          <span className="text-dark">
            <Link to="/">&#8592; back to home</Link>
          </span>
          <span className="float-right font-weight-bold">
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
