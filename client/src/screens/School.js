import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  Spinner,
} from "reactstrap";
import axios from "axios";
import search from "../assets/search.svg";
import empty from "../assets/empty.svg";
import SchoolCard from "../components/SchoolCard";
import Paginations from "../components/Paginations";

const School = () => {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(6);
  const [states, setStates] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/schools/${
          query.charAt(0).toUpperCase() + query.slice(1)
        }`
      );

      console.log(data);
      setStates(false);

      setTimeout(() => {
        setQuery("");
        setIsLoading(false);
        setSchools(data);
      }, 800);
    } catch (err) {
      setQuery("");
      console.log(err);
      setStates(true);
    }
  };

  // Get current schools
  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-4">
        <Col md={6}>
          <InputGroup>
            <Input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              id="cities"
              placeholder="Search with city"
            />

            <InputGroupAddon addonType="append">
              <Button
                onClick={fetchSchools}
                color="primary"
                className="ml-2 py-1 px-2">
                Search
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>

      {states ? (
        <Row className="d-flex justify-content-center mt-3">
          <Col md={4}>
            <img src={search} alt="search" className="img-fluid" />
          </Col>
        </Row>
      ) : (
        <>
          {isLoading ? (
            <Row>
              <Col className="mt-5 pt-5 text-center">
                <Spinner size="lg" color="primary" />
                <h4>Searching...</h4>
              </Col>
            </Row>
          ) : (
            <>
              {schools.length === 0 ? (
                <Row className="justify-content-center">
                  <Col xs={6} sm={4} md={3} className="pt-5 text-center">
                    <img src={empty} alt="empty" className="img-fluid" />
                    <h3 className="my-3">No School Found!</h3>
                  </Col>
                </Row>
              ) : (
                <>
                  <Row className="justify-content-center mt-4">
                    <SchoolCard schools={currentSchools} />
                  </Row>
                  <Row className="justify-content-center">
                    <Col>
                      <h6 className="text-center pt-2">{currentPage}</h6>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Paginations
                      dataPerPage={schoolsPerPage}
                      totalData={schools.length}
                      paginate={paginate}
                    />
                  </Row>
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default School;
