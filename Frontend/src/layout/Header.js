import React, { useState, useContext } from "react";
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
import { Link } from "react-router-dom";
import UserContext from "../components/context/UserContext";

const Header = () => {
  const context = useContext(UserContext);
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
      <Navbar light expand="sm" className="">
        <Container>
          <NavbarBrand className="font-weight-bold" href="/">
            Right Companion
          </NavbarBrand>

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
                <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" tag={Link}>
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/schools" tag={Link}>
                  Schools
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/blog" tag={Link}>
                  Blog
                </NavLink>
              </NavItem>
              {context.user ? (
                <Dropdown
                  isOpen={dropDownOpen}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  toggle={toggles}
                >
                  <DropdownToggle nav caret>
                    Hello, {context.user?.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Your Profile</DropdownItem>
                    <DropdownItem
                      tag={Link}
                      onClick={() => {
                        context.setUser(null);
                      }}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                ""
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
