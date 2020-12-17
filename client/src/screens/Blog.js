import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import axios from "axios";
import blog from "../assets/blog.svg";
import replace from "../assets/replace.svg";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/blogs`)
      .then(res => {
        setIsLoading(false);
        setBlogs(res.data);
      })
      .catch(err => {
        console.log(err.response);
        setIsLoading(true);
      });
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Row>
          <Col className="mt-5 pt-5 text-center">
            <Spinner size="lg" color="primary" />
            <h4>Loading...</h4>
          </Col>
        </Row>
      ) : (
        <>
          <Row className="py-3 h-100 text-center">
            <Col md={9} sm={6} xs={6} className="my-auto">
              <p className="blog-p">Today's digest</p>
            </Col>
            <Col md={3} sm={6} xs={6} className="my-auto">
              <img src={blog} alt="blogimage" className="img-fluid" />
            </Col>
          </Row>
          {blogs.length === 0 ? (
            <Row className="justify-content-center">
              <Col xs={6} sm={4} md={3} className="pt-5 text-center">
                <img src={replace} alt="replace" className="img-fluid" />
                <h3 className="my-3">No Blogs!</h3>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              <BlogCard blogs={blogs} />
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default Blog;
