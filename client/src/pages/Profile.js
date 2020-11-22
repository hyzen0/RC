import { useEffect, useContext, useState } from "react";
import UserContext from "../components/context/UserContext";
import { Col, Container } from "reactstrap";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profile", {
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
      <Col md={3}></Col>
    </Container>
  );
};

export default Profile;
