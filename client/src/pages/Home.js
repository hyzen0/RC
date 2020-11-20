import { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { MdPersonAdd } from "react-icons/md";

// Imported pages
import BookSection from "./BookSection";
import SchoolSection from "./SchoolSection";

// Import Image
import home from "../assets/home.svg";

// Import Context
import UserContext from "../components/context/UserContext";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  return (
    <section>
      <Container>
        <Row className="py-5 d-flex justify-content-center">
          <Col md={6} className="pt-4 my-auto text-center order-2 order-md-1">
            <h1>Welcome To Right Companion</h1>

            {state ? (
              ""
            ) : (
              <>
                <Link
                  to="/signin"
                  className="btn btn-outline-primary mt-2 mx-2"
                >
                  Sign In &nbsp;
                  <FiLogIn fontSize="25" />
                </Link>
                <Link to="/signup" className="btn btn-primary mt-2 mx-2">
                  Sign Up &nbsp;
                  <MdPersonAdd fontSize="25" />
                </Link>
              </>
            )}
          </Col>
          <Col md={6} className="order-1 order-md-2">
            <img src={home} alt="booksection" className="img-fluid" />
          </Col>
        </Row>
      </Container>
      <SchoolSection />
      <BookSection />
    </section>
  );
};

export default Home;
