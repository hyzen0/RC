import React from "react";
import { Container, Row, Col } from "reactstrap";

const BookSection = () => {
  return (
    <section>
      <Container>
        <Row className="py-3">
          <Col md={7} className="my-auto pt-5 order-2 order-md-1">
            <h3>Searching For Books?</h3>
            <p className="text-muted" style={{ fontSize: "1.3em" }}>
              Buy, sell and donate books across India.
            </p>
            <a href="/books" className="btn buttons shadow-sm">
              View Books &#8594;
            </a>
          </Col>
          <Col md={5} className="order-1 order-md-2">
            <img
              src={require("../assets/cards.svg")}
              alt="booksection"
              className="img-fluid py-3 px-3"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BookSection;
