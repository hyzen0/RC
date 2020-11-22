import { Container, Row, Col } from "reactstrap";
import BlogCard from "../components/Cards/BlogCard";
import blog from "../assets/blog.svg";

const Blog = () => {
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
        <BlogCard />
      </Row>
    </Container>
  );
};

export default Blog;
