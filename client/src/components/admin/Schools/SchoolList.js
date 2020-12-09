import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../../helpers/auth";

const SchoolList = () => {
  useEffect(() => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/schools/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => console.log(res.data));
  }, []);

  return <div></div>;
};

export default SchoolList;
