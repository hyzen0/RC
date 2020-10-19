import React from "react";
import { Container, Row, Col } from "reactstrap";
import Roll from "react-reveal/Roll";
import Modals from "../components/Modal/Modals";
import CardSection from "../components/CardSection";

const Home = () => {
  return (
    <>
      <Container>
        <Row className="" style={{ minHeight: "80vh" }}>
          <Col
            md={6}
            className="my-auto text-center order-2 order-md-1 pt-sm-2"
          >
            <h4>
              <Roll top cascade>
                Welcome To Right Companion
              </Roll>
            </h4>
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
      <CardSection />
    </>
  );
};

export default Home;
