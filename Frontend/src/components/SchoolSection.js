import React from "react";
import { Container, Row, Col } from "reactstrap";

const SchoolSection = () => {
  return (
    <Container>
      <Row className="py-4" style={{ minHeight: "70vh" }}>
        <Col md={7} className="my-auto  order-2 order-md-1 pt-sm-2 ">
          <h3>Looking For Best School?</h3>
          <p className="text-muted" style={{ fontSize: "1.3em" }}>
            Compare, see reviews of schools across India to find the ones that
            suit you best.
          </p>
          <a href="/schools" className="btn buttons shadow-sm">
            Nearby Schools &#8594;
          </a>
        </Col>
        <Col md={5} className="order-1 order-md-2">
          <img
            src={require("../assets/school.svg")}
            alt="..."
            className="img-fluid py-5"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SchoolSection;
