import { useState, useEffect } from "react";
import { Row, Col, Container, Form } from "reactstrap";
import { isAuth } from "../helpers/auth";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import activate from "../assets/activate.svg";
import { HiUserAdd } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { toast } from "react-toastify";

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token, name);
  }, [match.params]);
  const { name, token, show } = formData;

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/activation`, {
        token,
      })
      .then(res => {
        setFormData({
          ...formData,
          show: false,
        });

        toast.success(res.data.message);
      })
      .catch(err => {
        toast.error(err.response.data.errors);
      });
  };

  return (
    <Container>
      {isAuth() ? <Redirect to="/" /> : null}
      <Row className="pt-4 justify-content-center align-items-center">
        <Col md={5}>
          <img src={activate} alt="activate" className="img-fluid" />
        </Col>
      </Row>
      <Row className="pt-4 justify-content-center align-items-center">
        <Col md={8}>
          <h1 className="text-center">Welcome {name}</h1>
        </Col>
      </Row>
      <Row className="pt-3 justify-content-center align-items-center">
        <Col className="px-4" md={5}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-4">
                <HiUserAdd fontSize="20" /> Activate your Account
              </button>
            </div>
          </Form>
          <hr width="80%" />
          <div className="text-center">
            <Link to="/login" className="btn btn-outline-primary mt-2 mx-2">
              <FiLogIn fontSize="25" />
              &nbsp;Sign In
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Activate;
