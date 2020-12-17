import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
} from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaShare } from "react-icons/fa";

const Modals = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onClick = ({ target: { innerHTML } }) => {
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  const onCopy = () => {
    setCopied(true);
  };

  return (
    <>
      <span
        className="float-right btn btn-primary py-1 px-2"
        onClick={toggle}
        style={{ cursor: "pointer" }}>
        <FaShare /> Share
      </span>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Share</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="url" md={12} style={{ fontSize: "15px" }}>
                Copy this url and paste it!
              </Label>
              <Col md={9} xs={9}>
                <Input
                  type="text"
                  value={data}
                  id="url"
                  name="url"
                  bsSize="sm"
                  disabled
                />
              </Col>
              <Col md={3} xs={3} className="my-auto">
                <CopyToClipboard onCopy={onCopy} text={data}>
                  <Button
                    color="primary"
                    onClick={onClick}
                    className="py-0 px-2">
                    Copy
                  </Button>
                </CopyToClipboard>

                {copied ? <span style={{ color: "red" }}>Copied</span> : null}
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Modals;
