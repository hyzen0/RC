import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import school from "../assets/school.svg";
import { HiArrowNarrowRight } from "react-icons/hi";

const SchoolSection = () => {
  return (
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
              Compare, see reviews of schools across India to find the ones that
              suit you best.
            </p>
            <Link to="/school" className="btn btn-primary">
              Nearby Schools <HiArrowNarrowRight fontSize="20" />
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SchoolSection;
