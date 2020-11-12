import { useEffect, useContext } from "react";
import UserContext from "../components/context/UserContext";

const Profile = () => {
  const context = useContext(UserContext);

  // useEffect(() => {
  //   fetch("/api/auth/profile", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       context.setUser({
  //         name: data.name,
  //         profilepic: data.profilepic,
  //       });
  //     });
  // }, []);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Profile;
