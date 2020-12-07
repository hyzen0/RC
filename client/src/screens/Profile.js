import axios from "axios";
import { Container, Row, Col, Card, CardBody, Spinner } from "reactstrap";
import { useEffect, useState } from "react";
import { isAuth, getCookie } from "../helpers/auth";
import Avatar from "react-avatar";
import { MdPerson } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setIsLoading(false);
        setProfile(res.data);
      })
      .catch(err => {
        setIsLoading(true);
        console.log(err.response);
      });
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center mt-2">
        {isLoading ? (
          <Col className="pt-5">
            <div className="text-center">
              <Spinner size="lg" color="primary" />
              <h4>Loading...</h4>
            </div>
          </Col>
        ) : (
          <Col md={10} className="rounded">
            <Card className="shadow-sm">
              <CardBody>
                <Row>
                  <Col md={4}>
                    <div className="text-center">
                      <Avatar
                        textMarginRatio={0.1}
                        color="#417dfd"
                        round="10px"
                        className="shadow-sm"
                        size={180}
                        name={profile.name}
                        textSizeRatio={2.0}
                      />
                    </div>
                  </Col>
                  <Col md={8} className="pt-2">
                    <h4>
                      <MdPerson fontSize={38} color="red" /> &nbsp;Basic
                      Information
                    </h4>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Profile;
