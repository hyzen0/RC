import React from "react";
import { Row, Col } from "reactstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const socialLinks = [
  {
    href: "/",
    icon: <FaFacebook />,
  },
  {
    href: "/",
    icon: <FaTwitter />,
  },
  {
    href: "/",
    icon: <FaInstagram />,
  },
];

const FooterSocial = () => {
  return (
    <Row>
      <Col
        md={12}
        className="d-flex align-items-center justify-content-md-between justify-content-center my-2"
      >
        {socialLinks.map((socialLink, index) => (
          <a
            href={socialLink.href}
            className="d-block mx-2 text-white"
            key={index}
          >
            {socialLink.icon}
          </a>
        ))}
      </Col>
    </Row>
  );
};

export default FooterSocial;
