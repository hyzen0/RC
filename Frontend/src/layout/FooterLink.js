import React from "react";
import { Link } from "react-router-dom";

const showLinks = [
  {
    href: "/",
    linkText: "Home",
  },
  {
    href: "/about",
    linkText: "About Us",
  },
  {
    href: "/schools",
    linkText: "Schools",
  },
  {
    href: "/books",
    linkText: "Books",
  },
  {
    href: "/blog",
    linkText: "Blog",
  },
];

const FooterLink = () => {
  return (
    <ul className="nav mx-md-auto d-flex justify-content-center">
      {showLinks.map((showLink, index) => (
        <li className="nav-item" key={index}>
          <Link to={showLink.href} className="nav-link text-white">
            {showLink.linkText}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterLink;
