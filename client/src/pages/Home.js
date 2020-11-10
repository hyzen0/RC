import { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { ExitToAppOutlined, GroupAddOutlined } from "@material-ui/icons";

// Imported pages
import Book from "./Book";
import School from "./School";

// Import Image
import home from "../assets/home.svg";

// Import Context
import UserContext from "../components/context/UserContext";

const Home = () => {
  const context = useContext(UserContext);
  return (
    <section>
      <Container>
        <Row className="py-5 d-flex justify-content-center">
          <Col md={6} className="pt-4 my-auto text-center order-2 order-md-1">
            <h1>Welcome To Right Companion</h1>

            {context.user ? (
              ""
            ) : (
              <>
                <Link
                  to="/signin"
                  className="btn btn-outline-primary mt-2 mx-2"
                >
                  Sign In &nbsp;
                  <ExitToAppOutlined />
                </Link>
                <Link to="/signup" className="btn btn-primary mt-2 mx-2">
                  Sign Up &nbsp;
                  <GroupAddOutlined />
                </Link>
              </>
            )}
          </Col>
          <Col md={6} className="order-1 order-md-2">
            <img src={home} alt="booksection" className="img-fluid" />
          </Col>
        </Row>
      </Container>
      <School />
      <Book />
    </section>
  );
};

export default Home;
