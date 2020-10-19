import React, { useState } from "react";
import { Modal, ModalBody, Row, Col, ModalHeader } from "reactstrap";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "../Forms/LoginForm";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
              <small className="font-weight-bold">Connect with</small>
              <a href="/" className="btn" style={{ lineHeight: "0" }}>
                <FcGoogle size={25} />
              </a>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoginModal;
