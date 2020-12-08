import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";
import classnames from "classnames";
import DashBoard from "../assets/dashboard.svg";
import Analytics from "../components/admin/Analytics/Analytics";
import UsersList from "../components/admin/Users/UsersList";
import SchoolList from "../components/admin/Schools/SchoolList";
import BlogList from "../components/admin/Blogs/BlogList";

const AdminPannel = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div style={{ backgroundColor: "#1e1e2e", minHeight: "100vh" }}>
      <Container>
        <Row className="py-3 d-flex justify-content-center align-items-center px-3">
          <Col md={9} sm={6} xs={6}>
            <h2 className="text-white font-weight-normal">Admin Dashboard</h2>
          </Col>
          <Col md={3} sm={6} xs={6}>
            <img
              src={DashBoard}
              alt="blogimage"
              width="200"
              height="200"
              className="img-fluid"
            />
          </Col>
        </Row>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}>
              Analytics
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}>
              Users
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}>
              Schools
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4");
              }}>
              Blogs
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <Analytics tabId="1" />
          <UsersList tabId="2" />
          <SchoolList tabId="3" />
          <BlogList tabId="4" />
        </TabContent>
      </Container>
    </div>
  );
};

export default AdminPannel;
