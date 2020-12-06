import axios from "axios";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import { isAuth, getCookie } from "../helpers/auth";
import Avatar from "react-avatar";
import { MdPerson } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState({});

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
        setProfile(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center mt-2">
        <Col md={10} className="rounded">
          <Card className="shadow-sm">
            <CardBody>
              <Row noGutters>
                <Col md={4}>
                  <div className="avatars">
                    <Avatar
                      textMarginRatio={0.1}
                      color="#417dfd"
                      round="10px"
                      className="shadow-sm"
                      size={200}
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
      </Row>
    </Container>
  );
};

export default Profile;
