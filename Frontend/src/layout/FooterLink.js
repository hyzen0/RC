import React from "react";

const showLinks = [
  {
    id: 1,
    href: "/",
    linkText: "Home",
  },
  {
    id: 2,
    href: "/about",
    linkText: "About Us",
  },
  {
    id: 3,
    href: "/schools",
    linkText: "Schools",
  },
  {
    id: 4,
    href: "/books",
    linkText: "Books",
  },
];

const FooterLink = () => {
  return (
    <ul className="nav mx-md-auto d-flex justify-content-center">
      {showLinks.map((showLink) => (
        <li className="nav-item" key={showLink.id}>
          <a className="nav-link text-white" href={showLink.href}>
            {showLink.linkText}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FooterLink;
