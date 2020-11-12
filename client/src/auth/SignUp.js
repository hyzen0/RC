import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import register from "../assets/register.svg";

// SignUp Form
import SignUpForm from "../components/Form/SignUpForm";

const SignUp = () => {
  return (
    <Container>
      <Row className="pt-4 justify-content-center align-items-center">
        <Col md={5}>
          <img src={register} alt="signup" className="img-fluid" />
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col md={8}>
          <h3 className="text-center">Sign Up</h3>
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col className="px-4" md={5}>
          <SignUpForm />
        </Col>
      </Row>
      <Row className="justify-content-center pb-3 align-items-center">
        <Col md={5}>
          <span className="text-dark">
            <Link to="/">&#8592; back to home</Link>
          </span>
          <span className="float-right font-weight-bold">
            Already have an account?&nbsp;
            <Link to="/signin" className="text-danger">
              Sign In
            </Link>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
