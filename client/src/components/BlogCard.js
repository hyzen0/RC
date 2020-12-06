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
import blog from "../assets/replace.svg";

const BlogCard = props => {
  const { title, image, author = "admin", date, description, url } = props;

  let desc = description.slice(0, 78);

  return (
    <Col md={4} className="mt-3">
      <Card className="blogcard pb-0">
        <CardImg
          src={image || blog}
          alt={title}
          height="150"
          className="py-2"
        />
        <CardBody className="blog-card-body">
          <CardTitle tag="h4" className="text-dark text-capitalize">
            {title}
          </CardTitle>
          <CardSubtitle tag="p" className="text-muted">
            <FcBusinessman fontSize="20" /> <span>{author}</span> &nbsp;
            <small>{new Date(date).toDateString()}</small>
          </CardSubtitle>
          <CardText className="mt-3 text-muted" tag="p">
            {desc}...
          </CardText>
          <Link to={`${url}/`} className="mt-auto">
            Read More <HiArrowNarrowRight fontSize="18" />
          </Link>
        </CardBody>
      </Card>
      <hr className="d-md-none d-lg-none d-xl-none" />
    </Col>
  );
};
export default BlogCard;
