import React from "react";
import { Container, Row, Col } from "reactstrap";

const BookSection = () => {
  return (
    <section style={{ backgroundColor: "#F8F8FF" }}>
      <Container>
        <Row className="py-4" style={{ minHeight: "70vh" }}>
          <Col md={5}>
            <img
              src={require("../assets/cards.svg")}
              alt="booksection"
              className="img-fluid py-5 px-3"
            />
          </Col>
          <Col md={7} className="my-auto pt-sm-2">
            <h3>Searching For Books?</h3>
            <p className="text-muted" style={{ fontSize: "1.3em" }}>
              Buy, sell and donate books across India.
            </p>
            <a href="/books" className="btn buttons shadow-sm">
              View Books &#8594;
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BookSection;
