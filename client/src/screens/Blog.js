import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import blog from "../assets/blog.svg";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/blogs`)
      .then(res => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch(err => console.log(err));
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
        {!blogs ? (
          <h1>No Blogs Found!</h1>
        ) : (
          <>
            {blogs.map((blog, k) => (
              <BlogCard
                title={blog.title}
                image={blog.coverImg}
                date={blog.date}
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
