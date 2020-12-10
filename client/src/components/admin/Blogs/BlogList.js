import { useEffect, useState } from "react";
import { Row, Col, Spinner, TabPane } from "reactstrap";
import axios from "axios";
import BlogTable from "./BlogTable";
import Paginations from "../../Paginations";
import replace from "../../../assets/replace.svg";
import { MdNoteAdd } from "react-icons/md";

const BlogList = props => {
  const { tabId } = props;

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/blogs`)
      .then(res => {
        console.log(res.data);
        setIsLoading(false);
        setBlogs(res.data);
      })
      .catch(err => {
        setIsLoading(true);
        console.log(err.response);
      });
  }, []);

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

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
            <h5 className="text-white">Total Blogs: {blogs.length}</h5>
            <button type="button" className="btn btn-primary px-4 blogBtn">
              <MdNoteAdd /> Create New Blog
            </button>
          </Row>

          {blogs.length === 0 ? (
            <Row className="justify-content-center">
              <Col xs={6} sm={4} md={3} className="pt-5 text-center">
                <img src={replace} alt="replace" className="img-fluid" />
                <h4 className="my-3 text-white">No Blogs! Create New Blogs.</h4>
              </Col>
            </Row>
          ) : (
            <>
              <Row className="justify-content-center">
                <BlogTable blogs={currentBlogs} replace={replace} />
              </Row>
              <Row className="justify-content-center">
                <Col>
                  <h6 className="text-center text-white pt-2">{currentPage}</h6>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Paginations
                  dataPerPage={blogsPerPage}
                  totalData={blogs.length}
                  paginate={paginate}
                />
              </Row>
            </>
          )}
        </>
      )}
    </TabPane>
  );
};

export default BlogList;
