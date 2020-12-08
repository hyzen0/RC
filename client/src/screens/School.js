import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import axios from "axios";
import search from "../assets/search.svg";
import empty from "../assets/empty.svg";

const School = () => {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/schools/${
          query.charAt(0).toUpperCase() + query.slice(1)
        }`
      );
      console.log(data);
      setIsLoading(false);
      setSchools(data);
    } catch (err) {
      console.log(err);
      setIsLoading(true);
    }
  };

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

      {isLoading ? (
        <Row className="d-flex justify-content-center mt-3">
          <Col md={4}>
            <img src={search} alt="search" className="img-fluid" />
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
            <Row>
              <Col>
                {schools.map(school => (
                  <h1 className="text-dark" key={school._id}>
                    {school.city} &nbsp; {school.school_name}
                  </h1>
                ))}
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default School;
