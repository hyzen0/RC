import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
} from "reactstrap";

const SchoolCard = ({ schools }) => {
  return (
    <>
      {schools.map(school => (
        <Col md={4} className="my-3" key={school._id}>
          <Card className="pb-0 blogcard">
            <CardBody className="school-card">
              <CardTitle tag="h4" className="text-dark text-capitalize">
                {school.school_name}
              </CardTitle>
              <CardSubtitle tag="h6" className="text-muted mt-auto">
                Address: {school.address === "" ? "N/A" : school.address}
              </CardSubtitle>
              <CardText tag="p" className="text-muted mt-auto pt-1">
                City: {school.city}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default SchoolCard;
