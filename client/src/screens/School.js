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
import Autosuggest from "react-autosuggest";
import search from "../assets/search.svg";
import empty from "../assets/empty.svg";
import { Cities } from "../helpers/cities";
import SchoolCard from "../components/SchoolCard";
import Paginations from "../components/Paginations";

const escapeRegexCharacters = str => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return Cities.cities.filter(name => regex.test(name.city));
};

const getSuggestionValue = suggestion => {
  return suggestion.city;
};

const renderSuggestion = suggestion => {
  return <span>{suggestion.city}</span>;
};

const School = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [schools, setSchools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(6);
  const [states, setStates] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/schools/${value}`
      );

      console.log(data);
      setStates(false);

      setTimeout(() => {
        setValue("");
        setIsLoading(false);
        setSchools(data);
      }, 800);
    } catch (err) {
      setValue("");
      console.log(err);
      setStates(true);
    }
  };

  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Get current schools
  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const inputProps = {
    placeholder: "Search with city",
    value,
    onChange: onChange,
  };

  return (
    <Container>
      <Row className="mt-2 justify-content-center">
        <Col md={3} className="pt-sm-2 pt-2">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </Col>
        <Col md={2} className="pt-sm-2 pt-2">
          <Button onClick={fetchSchools} color="primary" className="py-1 px-2">
            Search
          </Button>
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
