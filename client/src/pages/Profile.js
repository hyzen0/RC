import { useEffect, useContext, useState } from "react";
import UserContext from "../components/context/UserContext";
import { Col, Container } from "reactstrap";
import BadgeAvatars from "../components/BadgeAvatars";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch("/api/auth/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Col md={3}>
        <BadgeAvatars
          name={profile.name?.charAt(0)}
          spacing={30}
          fontSize="10em"
        />
      </Col>
    </Container>
  );
};

export default Profile;
