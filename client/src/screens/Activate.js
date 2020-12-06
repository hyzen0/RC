import { useState, useEffect } from "react";
import { Row, Col, Form, UncontrolledAlert, Spinner } from "reactstrap";
import { isAuth } from "../helpers/auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import activate from "../assets/activate.svg";
import { HiUserAdd } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";

const Activate = ({ match }) => {
  const history = useHistory();
  const [msg, setMsg] = useState({ color: "", message: "" });
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
  }, [match.params, formData]);
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

        setMsg({
          color: "success",
          message: (
            <>
              {res.data.message} <Spinner color="success" size="sm" />
            </>
          ),
        });

        setTimeout(() => {
          history.push("/login/");
        }, 3000);
      })
      .catch(err => {
        setMsg({
          color: "danger",
          message: err.response.data.errors,
        });
      });
  };

  return (
    <section className="container-fluid">
      {isAuth() ? <Redirect to="/" /> : null}
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          {(msg.color && msg.message) === "" ? null : (
            <UncontrolledAlert color={msg.color} fade={false}>
              {msg.message}
            </UncontrolledAlert>
          )}
          <Row>
            <Col md={6} className="order-2 order-sm-1">
              <h2 className="text-center">Welcome {name}</h2>
              <br />
              <Form onSubmit={handleSubmit}>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    <HiUserAdd fontSize="20" /> Activate your Account
                  </button>
                </div>
              </Form>
              <hr width="80%" />
              <div className="text-center">
                <Link
                  to="/login/"
                  className="btn btn-outline-primary mt-2 mx-2">
                  <FiLogIn fontSize="25" />
                  &nbsp;Sign In
                </Link>
              </div>
            </Col>
            <Col md={6} className="order-1 order-sm-2">
              <img src={activate} alt="activate" className="img-fluid pb-3" />
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default Activate;
