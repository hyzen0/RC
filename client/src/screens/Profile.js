import axios from "axios";
import { useEffect } from "react";
import { isAuth, getCookie } from "../helpers/auth";

const Profile = () => {
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
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Profile component</h1>
    </div>
  );
};

export default Profile;
