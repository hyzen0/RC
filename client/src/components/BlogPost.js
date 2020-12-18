import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "reactstrap";
import blogImg from "../assets/replace.svg";
import Modals from "./Modals/Modals";

const BlogPost = props => {
  const [posts, setPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blogs/${props.match.params.id}`
      );

      setIsLoading(false);
      setPosts(data);
    };

    fetchBlog();
  }, [props.match.params.id]);

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
          <Row className="d-flex justify-content-center mx-1">
            <h1
              className="mt-3"
              style={{
                fontWeight: "600",
                fontSize: "54px",
                color: "#110d1d",
                fontStyle: "normal",
              }}>
              {posts.title}
            </h1>
          </Row>

          <Row className="d-flex justify-content-center my-3">
            <Col md={4} xs={8} sm={8}>
              <img
                src={posts.coverImg || blogImg}
                alt={posts.title}
                className="img-fluid"
              />
            </Col>
          </Row>

          <Row className="d-flex justify-content-between mx-1 my-2">
            <p style={{ fontSize: "14px" }} className="my-auto">
              Published on {new Date(posts.date).toDateString()}
            </p>
            <Modals data={window.location.href} />
          </Row>

          <Row className="d-flex justify-content-between blogAuthor">
            <Col>
              <p
                className="mb-0"
                style={{ fontSize: "18px", fontWeight: "600" }}>
                {posts.author ? posts.author : "Admin"}
              </p>
              <small className="text-muted">Right Companion Pvt. Ltd.</small>
            </Col>
            <Col className="my-auto">
              <a
                href="!#"
                target="_blank"
                rel="noopener noreferrer"
                className="float-right text-decoration-none">
                Follow us on LinkedIn
              </a>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center mx-1 my-3">
            <Col
              tag="div"
              dangerouslySetInnerHTML={{ __html: posts.description }}
              style={{ fontSize: "18px", lineHeight: "29px", color: "#110d1d" }}
            />
          </Row>
        </>
      )}
    </Container>
  );
};

export default BlogPost;
