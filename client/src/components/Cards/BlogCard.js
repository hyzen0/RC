import {
  Col,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import { FcBusinessman } from "react-icons/fc";
import blog from "../../assets/replace.svg";

const BlogCard = (props) => {
  const { title, image, author, date } = props;
  return (
    <Col md={4} className="my-3">
      <Card className="blogcard">
        <CardImg
          src={image || blog}
          alt={title}
          height="150"
          className="py-2"
        />
        <CardBody className="blog-card-body">
          <CardTitle tag="h4" className="text-muted">
            {title}
          </CardTitle>
          <CardSubtitle tag="h6" className="text-muted">
            <FcBusinessman fontSize="20" /> <span>{author}</span>
            <small>{date}</small>
          </CardSubtitle>
        </CardBody>
      </Card>
    </Col>
  );
};
export default BlogCard;
