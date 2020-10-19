import React from "react";
import { Container, Row, Col } from "reactstrap";
import { MdLocalPhone, MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <section className="bg-dark">
      <Container fluid>
        <Row className="px-4">
          <Col md={4}>
            <img
              src={require("../assets/logo.png")}
              alt="..."
              className="img-fluid"
              width="300"
              height="300"
            />
          </Col>
          <Col md={4} className="pt-5">
            <h3 className="font-weight-normal text-white mb-3">Contact</h3>
            <p className="text-white mb-2">
              <MdLocalPhone /> +246-542-550-5462
            </p>
            <p className="mb-2">
              <a href="mailto:info@gmail.com" className="text-white">
                <MdEmail /> info@gmail.com
              </a>
            </p>
            <p className="text-white mb-2">
              <MdLocationOn /> Street View
            </p>
          </Col>
          <Col md={4} className="pt-5">
            <h3 className=" font-weight-normal text-white mb-3">Links</h3>
            <p className="mb-2">
              <a href="/" className="text-white">
                Home
              </a>
            </p>
            <p className="mb-2">
              <a href="/about" className="text-white">
                About Us
              </a>
            </p>
            <p className="mb-2">
              <a href="/schools" className="text-white">
                School List
              </a>
            </p>
          </Col>
        </Row>
        <Row class="row">
          <Col md={12} className="mt-3">
            <p className="text-center text-white">
              © Copyright 2020 Right Companion Pvt. Ltd. - All rights reserved.{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
