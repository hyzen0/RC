import React from "react";
import { Container, Row, Col } from "reactstrap";

const SchoolSection = () => {
  return (
    <section style={{ backgroundColor: "rgb(250,248,246)" }}>
      <Container>
        <Row className="py-3">
          <Col md={5}>
            <img
              src={require("../assets/school.svg")}
              alt="..."
              className="img-fluid py-3 px-3"
            />
          </Col>
          <Col md={7} className="my-auto pt-5">
            <h3>Looking For Best School?</h3>
            <p className="text-muted" style={{ fontSize: "1.3em" }}>
              Compare, see reviews of schools across India to find the ones that
              suit you best.
            </p>
            <a href="/schools" className="btn buttons">
              Nearby Schools&nbsp; &#8594;
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SchoolSection;
