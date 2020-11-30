import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  Form,
  FormGroup,
  UncontrolledAlert,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import reset from "../assets/reset.svg";

const ResetPassword = ({ match }) => {
  const history = useHistory();

  const [msg, setMsg] = useState({ color: "", message: "" });

  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    token: "",
    textChange: "Reset",
  });
  const { password1, password2, textChange, token } = formData;

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setFormData({ ...formData, token });
    }
  }, [match.params]);

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    console.log(password1, password2);
    e.preventDefault();
    if (password1 && password2) {
      if (password1 === password2) {
        setFormData({
          ...formData,
          textChange: (
            <>
              <Spinner color="light" size="sm" /> Resetting...
            </>
          ),
        });
        axios
          .put(`${process.env.REACT_APP_API_URL}/api/resetpassword`, {
            newPassword: password1,
            resetPasswordLink: token,
          })
          .then(res => {
            // console.log(res.data.message);
            setFormData({
              ...formData,
              password1: "",
              password2: "",
              textChange: (
                <>
                  <FiCheckCircle /> Reset
                </>
              ),
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
              history.push("/login");
            }, 3000);
          })
          .catch(err => {
            setFormData({
              ...formData,
              password1: "",
              password2: "",
              textChange: "Reset",
            });
            console.log(err.response);
            setMsg({
              color: "danger",
              message: err.response.data.errors,
            });
          });
      } else {
        setMsg({
          color: "warning",
          message: "Password doesn't matches!",
        });
      }
    } else {
      setMsg({
        color: "danger",
        message: "Please fill all fields!",
      });
    }
  };

  return (
    <section className="container-fluid">
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          {(msg.color && msg.message) === "" ? null : (
            <UncontrolledAlert color={msg.color} fade={false}>
              {msg.message}
            </UncontrolledAlert>
          )}
          <Row>
            <Col md={6} className="order-2 order-sm-1">
              <h2 className="text-center">Reset Your Password</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="password" className="mb-1">
                    New Password
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange("password1")}
                    value={password1}
                  />
                  <Label for="password2" className="mb-1">
                    Confirm Password
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="password2"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange("password2")}
                    value={password2}
                  />
                </FormGroup>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    {textChange}
                  </button>
                </div>
              </Form>
            </Col>
            <Col md={6} className="order-1 order-sm-2">
              <img src={reset} alt="reset" className="img-fluid pb-3" />
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default ResetPassword;
