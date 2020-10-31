import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const BookSection = () => {
  return (
    <section>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={6} className="pt-4 my-auto text-center order-2 order-md-1">
            <h2>Searching For Books?</h2>
            <p className="text-muted" style={{ fontSize: "18px" }}>
              Buy, sell and donate books across India.
            </p>
            <Link to="/books" className="btn buttons">
              View Books&nbsp; &#8594;
            </Link>
          </Col>
          <Col md={6} className="order-1 order-md-2">
            <img
              src={require("../assets/cards.svg")}
              alt="booksection"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BookSection;
