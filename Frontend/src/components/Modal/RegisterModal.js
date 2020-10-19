import React, { useState } from "react";
import { Modal, ModalBody, Row, Col, ModalHeader } from "reactstrap";
import RegisterForm from "../Forms/RegisterForm";

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <button
        onClick={toggle}
        className="btn buttons mt-2 mx-2 shadow-sm font-weight-bold px-3"
      >
        Register
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
                src={require("./register.svg")}
                alt="..."
                className="img-fluid"
                width="200"
                height="200"
              />
            </Col>
            <Col xs={12}>
              <h3>Register</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="px-4">
              <RegisterForm />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RegisterModal;
