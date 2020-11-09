import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BookSection from "../components/BookSection";
import SchoolSection from "../components/SchoolSection";
import UserContext from "../components/context/UserContext";

const Home = () => {
  const context = useContext(UserContext);
  return (
    <>
      <Container>
        <Row className="py-5 d-flex justify-content-center">
          <Col md={6} className="pt-4 my-auto text-center order-2 order-md-1">
            <h1>Welcome To Right Companion</h1>

            {context.user ? (
              ""
            ) : (
              <>
                <Link to="/signin" className="btn buttons mt-2 mx-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn buttons mt-2 mx-2">
                  Register
                </Link>
              </>
            )}
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
