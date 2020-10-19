import React, { useState } from "react";
import { Modal, ModalBody, Row, Col, ModalHeader } from "reactstrap";
import { FcGoogle, FcLock } from "react-icons/fc";
import Forms from "../Forms/Forms";

const Modals = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <button
        onClick={toggle}
        className="btn buttons mt-2 shadow font-weight-bold"
        style={{ width: "10em" }}
      >
        LOGIN
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
              <FcLock size={60} />
            </Col>
            <Col xs={12}>
              <h3>Sign In</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="px-4">
              <Forms />
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

export default Modals;
