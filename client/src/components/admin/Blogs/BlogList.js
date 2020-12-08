import { useEffect, useState } from "react";
import { Row, Col, Spinner, TabPane } from "reactstrap";
import axios from "axios";
import BlogTable from "./BlogTable";
import replace from "../../../assets/replace.svg";

const BlogList = props => {
  const { tabId } = props;

  const [blogs, setBlogs] = useState([]);
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
          {blogs.length === 0 ? (
            <Row className="justify-content-center">
              <Col xs={6} sm={4} md={3} className="pt-5 text-center">
                <img src={replace} alt="replace" className="img-fluid" />
                <h4 className="my-3 text-white">
                  No Blogs! Try Creating New Blogs.
                </h4>
              </Col>
            </Row>
          ) : (
            <BlogTable blogs={blogs} replace={replace} />
          )}
        </>
      )}
    </TabPane>
  );
};

export default BlogList;
