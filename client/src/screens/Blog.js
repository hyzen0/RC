import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import axios from "axios";
import blog from "../assets/blog.svg";
import BlogCard from "../components/BlogCard";

const Blog = () => {
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
        console.log(err.response);
        setIsLoading(true);
      });
  }, []);

  return (
    <Container>
      <Row className="py-3 h-100 text-center">
        <Col md={9} sm={6} xs={6} className="my-auto">
          <p className="blog-p">Today's digest</p>
        </Col>
        <Col md={3} sm={6} xs={6} className="my-auto">
          <img src={blog} alt="blogimage" className="img-fluid" />
        </Col>
      </Row>
      <Row>
        {isLoading ? (
          <Col className="pt-5">
            <div className="text-center">
              <Spinner size="lg" color="primary" />
              <h4>Loading...</h4>
            </div>
          </Col>
        ) : (
          <>
            {blogs.map((blog, k) => (
              <BlogCard
                title={blog.title}
                description={blog.description}
                image={blog.coverImg}
                date={blog.date}
                url={blog._id}
                key={k}
              />
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default Blog;
