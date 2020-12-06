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

const School = () => {
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      const { data } = await axios.get();
      setIsLoading(false);
      setDetail(data);
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
          {detail === [] ? (
            <h4 className="text-center mt-5">No School Found in this City!</h4>
          ) : (
            "School fetched"
          )}
        </>
      )}
    </Container>
  );
};

export default School;
