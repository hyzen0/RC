import React from "react";
import { Row, Col } from "reactstrap";
import { Facebook, Instagram, Twitter, LinkedIn } from "@material-ui/icons";

const socialLinks = [
  {
    href: "/",
    icon: <Facebook />,
  },
  {
    href: "/",
    icon: <Twitter />,
  },
  {
    href: "/",
    icon: <Instagram />,
  },
  {
    href: "/",
    icon: <LinkedIn />,
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
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialLink.icon}
          </a>
        ))}
      </Col>
    </Row>
  );
};

export default FooterSocial;
