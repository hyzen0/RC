import React from "react";
import { Container, Row, Col } from "reactstrap";
import Modals from "../components/Modal/Modals";
import BookSection from "../components/BookSection";
import SchoolSection from "../components/SchoolSection";

const Home = () => {
  return (
    <>
      <Container>
        <Row style={{ minHeight: "85vh" }}>
          <Col
            md={6}
            className="my-auto text-center order-2 order-md-1 pt-sm-2"
          >
            <h3>Welcome To Right Companion</h3>
            <Modals />
          </Col>
          <Col md={6} className="order-1 order-md-2 my-auto">
            <img
              src={require("../assets/main.svg")}
              alt="booksection"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
      <BookSection />
      <SchoolSection />
    </>
  );
};

export default Home;
