import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Spinner,
  TabPane,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SchoolTable from "./SchoolTable";
import Paginations from "../../Paginations";
import replace from "../../../assets/empty.svg";
import { MdNoteAdd } from "react-icons/md";
import { getCookie } from "../../../helpers/auth";

const SchoolList = ({ tabId }) => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [allSchools, setAllSchools] = useState([]);
  const [schools, setSchools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/schools/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setIsLoading(false);
        setAllSchools(res.data);
      })
      .catch(err => {
        setIsLoading(true);
        console.log(err.response);
      });
  }, []);

  const fetchSchools = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/schools/${
        query.charAt(0).toUpperCase() + query.slice(1)
      }`
    );
    setIsLoading(true);
    console.log(data);
    setTimeout(() => {
      setQuery("");
      setIsLoading(false);
      setSchools(data);
    }, 500);
  };

  // Get current schools
  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <TabPane tabId={tabId}>
      {isLoading ? (
        <Row>
          <Col className="pt-5">
            <div className="text-center">
              <Spinner size="lg" color="primary" />
              <h4 className="text-white">Loading...</h4>
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row className="d-flex justify-content-between mt-2 mx-1">
            <h5 className="text-white">
              Total Schools in Database: {allSchools.length}
            </h5>
            <button
              type="button"
              className="btn btn-primary px-4 blogBtn"
              onClick={() => history.push("/admin/newschool/")}>
              <MdNoteAdd /> Add New School
            </button>
          </Row>
          {allSchools.length === 0 ? (
            <Row className="justify-content-center">
              <Col xs={6} sm={4} md={3} className="pt-5 text-center">
                <img src={replace} alt="replace" className="img-fluid" />
                <h4 className="my-3 text-white">
                  No School! Create New School.
                </h4>
              </Col>
            </Row>
          ) : (
            <>
              <Row className="d-flex justify-content-center mt-2">
                <Col md={5}>
                  <InputGroup>
                    <Input
                      type="text"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      id="cities"
                      placeholder="Search with city"
                    />
                    <InputGroupAddon addonType="append">
                      {query === "" ? (
                        <Button
                          disabled
                          onClick={fetchSchools}
                          color="secondary"
                          className="ml-1 py-1 px-2">
                          Search
                        </Button>
                      ) : (
                        <Button
                          onClick={fetchSchools}
                          color="primary"
                          className="ml-1 py-1 px-2">
                          Search
                        </Button>
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              {schools.length === 0 ? (
                <Row className="d-flex justify-content-center">
                  <Col xs={6} sm={4} md={3} className="pt-5 text-center">
                    <img src={replace} alt="replace" className="img-fluid" />
                    <h4 className="my-3 text-white">No School! Search</h4>
                  </Col>
                </Row>
              ) : (
                <>
                  <Row className="d-flex justify-content-between align-items-center pt-2">
                    <h6 className="text-white">
                      Total Schools: {schools.length}
                    </h6>
                    <h6 className="text-white">{currentPage}</h6>
                    <Paginations
                      dataPerPage={schoolsPerPage}
                      totalData={schools.length}
                      paginate={paginate}
                    />
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <SchoolTable schools={currentSchools} history={history} />
                  </Row>
                </>
              )}
            </>
          )}
        </>
      )}
    </TabPane>
  );
};

export default SchoolList;
