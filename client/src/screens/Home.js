import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { MdPersonAdd } from "react-icons/md";
import { HiArrowNarrowRight } from "react-icons/hi";
import { isAuth } from "../helpers/auth";

// assets
import home from "../assets/home.svg";
import book from "../assets/book.svg";
import school from "../assets/school.svg";

const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Row className="py-5 d-flex justify-content-center">
            <Col md={6} className="pt-4 my-auto text-center order-2 order-md-1">
              <h1>Welcome To Right Companion</h1>

              {isAuth() ? (
                ""
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary mt-2 mx-2">
                    Sign In &nbsp;
                    <FiLogIn fontSize="25" />
                  </Link>
                  <Link to="/register" className="btn btn-primary mt-2 mx-2">
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
      </section>

      <section style={{ backgroundColor: "rgb(250,248,246,0.7)" }}>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md={4}>
              <img src={school} alt="school" className="img-fluid" />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center pt-4">
            <Col md={7} className="text-center">
              <h2>Looking For Best School?</h2>
              <p className="text-muted" style={{ fontSize: "18px" }}>
                Compare, see reviews of schools across India to find the ones
                that suit you best.
              </p>
              <Link to="/school" className="btn btn-primary">
                Nearby Schools <HiArrowNarrowRight fontSize="20" />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md={6} className="pt-4 my-auto text-center order-2 order-md-1">
              <h2>Searching For Books?</h2>
              <p className="text-muted" style={{ fontSize: "18px" }}>
                Buy, sell and donate books across India.
              </p>
              <Link to="/book" className="btn btn-primary">
                View Books <HiArrowNarrowRight fontSize="20" />
              </Link>
            </Col>
            <Col md={6} className="order-1 order-md-2">
              <img src={book} alt="book" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
