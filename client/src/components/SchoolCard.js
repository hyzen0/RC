import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardLink,
} from "reactstrap";

const SchoolCard = ({ schools }) => {
  return (
    <>
      {schools.map(school => (
        <Col md={4} className="my-3" key={school._id}>
          <Card className="pb-0 blogcard">
            <CardBody className="school-card">
              <CardTitle tag="h5" className="text-dark text-capitalize">
                {school.school_name}
              </CardTitle>
              <CardSubtitle tag="p" className="text-muted">
                Address: {school.address === "" ? "N/A" : school.address}
              </CardSubtitle>
              <CardText tag="small" className="text-muted pt-1">
                Board: &nbsp;
                {school.board === ("-" || "") ? "N/A" : school.board}
              </CardText>
              <CardText tag="small" className="text-muted mt-auto">
                Website: &nbsp;
                {school.website === "" ? (
                  "N/A"
                ) : (
                  <CardLink href={school.website} target="_blank">
                    {school.website}
                  </CardLink>
                )}
              </CardText>
              <CardText tag="small" className="text-muted mt-auto">
                Contact No.: &nbsp;
                {school.contact_no === "" ? (
                  "N/A"
                ) : (
                  <CardLink href={`tel:${school.contact_no}`}>
                    {school.contact_no}
                  </CardLink>
                )}
              </CardText>
              <CardText tag="p" className="text-muted mt-auto pt-1">
                City: {school.city}
                <span className="float-right">
                  Pincode: &nbsp;
                  {school.pincode === null ? "N/A" : school.pincode}
                </span>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default SchoolCard;
