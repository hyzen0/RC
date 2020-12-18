import {
  Col,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  CardText,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FcBusinessman } from "react-icons/fc";
import { HiArrowNarrowRight } from "react-icons/hi";
import blogImg from "../assets/replace.svg";

const BlogCard = ({ blogs }) => {
  return (
    <>
      {blogs.map(blog => (
        <Col md={4} className="my-3" key={blog._id}>
          <Card className="blogcard pb-0">
            <CardImg
              src={blog.coverImg || blogImg}
              alt={blog.title}
              height="150"
              className="py-2"
            />
            <CardBody className="blog-card-body">
              <CardTitle tag="h4" className="text-dark text-capitalize">
                {blog.title}
              </CardTitle>
              <CardSubtitle tag="p" className="text-muted mt-auto">
                <FcBusinessman fontSize="20" />
                <span>{(blog.author = "admin")}</span> &nbsp;
                <small>{new Date(blog.date).toDateString()}</small>
              </CardSubtitle>
              <Link to={`/blog/${blog._id}/`} className="mt-auto">
                Read More <HiArrowNarrowRight fontSize="18" />
              </Link>
            </CardBody>
          </Card>
          <hr className="d-md-none d-lg-none d-xl-none" />
        </Col>
      ))}
    </>
  );
};
export default BlogCard;
