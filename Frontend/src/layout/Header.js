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
import { Menu, Close } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../components/context/UserContext";
import { toast } from "react-toastify";

const Header = () => {
  const context = useContext(UserContext);
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggles = () => setDropDownOpen((prevState) => !prevState); //dropdown for logout and profile section
  const toggle = () => setIsOpen(!isOpen); //for navbar opening in mobile

  const onMouseEnter = () => {
    setDropDownOpen(true);
  };

  const onMouseLeave = () => {
    setDropDownOpen(false);
  };

  //logout user
  const handleLogout = () => {
    context.setUser(null);
    localStorage.clear();
    toast("We Hope To See you Again!");
    history.push("/");
  };

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
            {!isOpen ? <Menu /> : <Close />}
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
              {/* set user in navbar */}
              {context.user ? (
                <Dropdown
                  isOpen={dropDownOpen}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  toggle={toggles}
                >
                  <DropdownToggle nav caret>
                    Hello, {context.id}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Your Profile</DropdownItem>
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
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
