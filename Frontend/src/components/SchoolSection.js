import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const SchoolSection = () => {
  return (
    <section style={{ backgroundColor: "rgb(250,248,246,0.7)" }}>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={4}>
            <img
              src={require("../assets/school.svg")}
              alt="..."
              className="img-fluid"
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center pt-4">
          <Col md={7} className="text-center">
            <h2>Looking For Best School?</h2>
            <p className="text-muted" style={{ fontSize: "18px" }}>
              Compare, see reviews of schools across India to find the ones that
              suit you best.
            </p>
            <Link to="/schools" className="btn buttons">
              Nearby Schools&nbsp; &#8594;
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SchoolSection;
