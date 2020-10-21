import React, { useState } from "react";
import { Modal, ModalBody, Row, Col, ModalHeader } from "reactstrap";

import LoginForm from "../Forms/LoginForm";
import GoogleLogin from "react-google-login";
import Axios from "axios";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const responseSuccessGoogle = res => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/google",
      data: { tokenId: res.tokenId },
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const responseErrorGoogle = res => {
    console.log(res);
  };

  return (
    <>
      <button
        onClick={toggle}
        className="btn buttons mt-2 mx-2 shadow-sm font-weight-bold px-3"
      >
        Sign In
      </button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        style={{ borderRadius: "50px" }}
      >
        <ModalHeader
          toggle={toggle}
          style={{
            border: "none",
            padding: "0.5rem 1rem",
          }}
        />
        <ModalBody>
          <Row className="text-center my-3 ">
            <Col xs={12}>
              <img
                src={require("./auth.svg")}
                alt="..."
                className="img-fluid"
                width="200"
                height="200"
              />
            </Col>
            <Col xs={12}>
              <h3>Sign In</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="px-4">
              <LoginForm />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-center">
              <GoogleLogin
                clientId="204747813298-4a065sn8m1rdgo2gq2n4gtmab8mg193l.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={"single_host_origin"}
              />
              ,
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoginModal;
