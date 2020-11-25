import { useEffect, useContext, useState } from "react";
import UserContext from "../components/context/UserContext";
import { Col, Container, Row } from "reactstrap";
import Avatars from "../components/Avatars";
import { MdEmail } from "react-icons/md";
import { Col, Container } from "reactstrap";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (state) {
      setProfile(state);
    }
  }, [state]);

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col md={6} sm={6} className="pt-3">
          <div className="avatars">
            <Avatars
              className="shadow-sm"
              size={200}
              name={profile.name}
              textSizeRatio={2.0}
            />
          </div>
          <h1 className="pt-2 mb-0" style={{ textTransform: "capitalize" }}>
            {profile.name}
          </h1>
          <h6 className="text-muted pl-1">{profile.username}</h6>
          <MdEmail fontSize="18" className="ml-1" /> {profile.email}
        </Col>
        <Col md={6} sm={6} className="pt-3"></Col>
      </Row>
    </Container>
  );
};

export default Profile;
