import { useEffect, useContext, useState } from "react";
import UserContext from "../components/context/UserContext";
import { Col, Container } from "reactstrap";
import { API } from "../backend";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch(`${API}api/auth/profile`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container>
      <Col md={3}>{profile.name}</Col>
    </Container>
  );
};

export default Profile;
