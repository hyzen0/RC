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
  DropdownItem,
  Container,
} from "reactstrap";
import { Menu, Close, ExitToAppOutlined } from "@material-ui/icons";
import { Link, useHistory, NavLink as RRNavLink } from "react-router-dom";
import UserContext from "../components/context/UserContext";
import { toast } from "react-toastify";
import BadgeAvatars from "./BadgeAvatars";

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

  // Profile Route
  const profileRoute = () => {
    history.push("/v1/user/profile");
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
      <Navbar light expand="sm">
        <Container fluid className="px-2">
          <NavbarBrand className="font-weight-bold" href="/">
            <span style={{ color: "#417dfd" }}>Right</span> Companion
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
              {context.user ? (
                <Dropdown
                  isOpen={dropDownOpen}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  toggle={toggles}
                >
                  <DropdownToggle nav style={{ padding: "0" }}>
                    <BadgeAvatars name={context.user.name?.charAt(0)} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={profileRoute}>
                      Your Profile
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <>
                  <NavItem>
                    <NavLink
                      to="/signin"
                      tag={Link}
                      className="py-1 mt-1 mx-1 text-white btn btn-primary"
                    >
                      Sign In <ExitToAppOutlined fontSize="small" />
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
