import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BookSection from "../components/BookSection";
import SchoolSection from "../components/SchoolSection";

const Home = () => {
  return (
    <>
      <Container>
        <Row className="py-5 d-flex justify-content-center">
          <Col md={6} className="pt-4 my-auto text-center order-2 order-md-1">
            <h1>Welcome To Right Companion</h1>

            {/* SignIn Button */}
            <Link to="/signin" className="btn buttons mt-2 mx-2">
              Sign In
            </Link>
            {/* Register Button */}
            <Link to="/register" className="btn buttons mt-2 mx-2">
              Register
            </Link>
          </Col>
          <Col md={6} className="order-1 order-md-2">
            <img
              src={require("../assets/main.svg")}
              alt="booksection"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
      <SchoolSection />
      <BookSection />
    </>
  );
};

export default Home;
