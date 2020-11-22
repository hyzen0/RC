import { useState, useContext } from "react";
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
  Container,
  DropdownItem,
} from "reactstrap";
import { MdClose, MdMenu } from "react-icons/md";
import { Link, useHistory, NavLink as RRNavLink } from "react-router-dom";
import UserContext from "../components/context/UserContext";
import { toast } from "react-toastify";

const Header = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggles = () => setDropDownOpen((prevState) => !prevState); //dropdown for logout and profile section
  const toggle = () => setIsOpen(!isOpen); //for navbar opening in mobile

  //logout user
  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    toast("We Hope To See you Again!");
    history.push("/");
  };

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
            style={{ outline: "none", boxShadow: "none", fontSize: "1.8em" }}
          >
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
              {state ? (
                <>
                  <NavItem>
                    <NavLink
                      to="/v1/user/profile"
                      tag={RRNavLink}
                      activeClassName="active"
                    >
                      Your Profile
                    </NavLink>
                  </NavItem>
                  <Dropdown isOpen={dropDownOpen} toggle={toggles}>
                    <DropdownToggle nav caret style={{ padding: "8px 0" }} />
                    <DropdownMenu right>
                      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink
                      to="/signin"
                      tag={Link}
                      className="py-1 mt-1 mx-1 text-white btn btn-primary"
                    >
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
