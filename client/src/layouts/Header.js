import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { MdClose, MdMenu } from "react-icons/md";
import { Link, useHistory, NavLink as RRNavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuth, signout } from "../helpers/auth";

const Header = () => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen); //for navbar opening in mobile

  return (
    <>
      <Navbar light expand="sm" style={{ backgroundColor: "white" }}>
        <Container fluid="lg" className="px-2">
          <NavbarBrand className="font-weight-bold" href="/">
            <span style={{ color: "#417dfd" }}>Right</span> Companion
          </NavbarBrand>

          {/* Navbar Toggle */}
          <span
            className="d-sm-none d-md-none d-lg-none d-xl-none"
            onClick={toggle}
            style={{ outline: "none", boxShadow: "none", fontSize: "1.8em" }}>
            {!isOpen ? <MdMenu /> : <MdClose />}
          </span>

          {/* Navbar items */}
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/" tag={RRNavLink} activeClassName="active" exact>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" tag={RRNavLink} activeClassName="active">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/school" tag={RRNavLink} activeClassName="active">
                  Schools
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/book" tag={RRNavLink} activeClassName="active">
                  Books
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/blog" tag={RRNavLink} activeClassName="active">
                  Blog
                </NavLink>
              </NavItem>

              {/* set user in navbar */}
              {isAuth() ? (
                <>
                  <NavItem>
                    <NavLink
                      to="/user/profile"
                      tag={RRNavLink}
                      activeClassName="active">
                      Your Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        signout(() => {
                          toast("We Hope To See you Again!");
                          history.push("/");
                        });
                      }}
                      className="py-1 mt-1 mx-1 text-white btn btn-primary">
                      Logout
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink
                      to="/login"
                      tag={Link}
                      className="py-1 mt-1 mx-1 text-white btn btn-primary">
                      Sign In
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
