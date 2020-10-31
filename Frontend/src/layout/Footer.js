import React from "react";
import { Container, Row, Col } from "reactstrap";
import FooterLink from "./FooterLink";
import FooterSocial from "./FooterSocial";

const Footer = () => {
  return (
    <Container fluid style={{ backgroundColor: "#252835" }}>
      <Row className="">
        <Col
          md={12}
          className="text-center mx-auto d-md-flex align-items-center"
        >
          {/* Footer Logo */}
          <img
            src={require("../assets/logo.png")}
            alt="..."
            width="100"
            height="100"
          />

          {/* page links */}
          <FooterLink />

          {/* Social Links */}
          <FooterSocial />
        </Col>
      </Row>
      <hr style={{ backgroundColor: "white", margin: "0 auto" }} width="70%" />

      {/* Copyright Tag */}
      <Row>
        <Col md={12} className="text-center">
          <p className="mt-1 mb-2 text-white">
            © 2020 Right Companion Pvt. Ltd.
            <br /> All rights reserved
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
