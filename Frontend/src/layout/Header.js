import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";
import { MdClear, MdDehaze } from "react-icons/md";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const onMouseEnter = () => {
    setDropDownOpen(true);
  };

  const onMouseLeave = () => {
    setDropDownOpen(false);
  };
  const toggles = () => setDropDownOpen((prevState) => !prevState);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="light" light expand="sm" className="py-2">
        <Container fluid className="px-3">
          <NavbarBrand href="/">Right Companion</NavbarBrand>
          {/* Navbar Toggle */}
          <span
            className="d-sm-none d-md-none d-lg-none d-xl-none"
            onClick={toggle}
            style={{ outline: "none", boxShadow: "none", fontSize: "1.8em" }}
          >
            {isOpen ? <MdClear /> : <MdDehaze />}
          </span>
          {/* Navbar items */}
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">About Us</NavLink>
              </NavItem>
              <Dropdown
                isOpen={dropDownOpen}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                toggle={toggles}
              >
                <DropdownToggle nav caret>
                  Hello, Username
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Your Profile</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
