import { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  UncontrolledAlert,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";
import axios from "axios";
import { getCookie } from "../../../helpers/auth";

const SchoolCreate = () => {
  const history = useHistory();
  const [msg, setMsg] = useState({ color: "", message: "" });
  const [formData, setFormData] = useState({
    school_name: "",
    address: "",
    board: "",
    mail_id: "",
    website: "",
    contact_no: "",
    city: "",
    pincode: "",
    btnText: (
      <>
        <MdNoteAdd /> Add School
      </>
    ),
  });

  const {
    school_name,
    address,
    board,
    mail_id,
    website,
    contact_no,
    city,
    pincode,
    btnText,
  } = formData;

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    const token = getCookie("token");
    e.preventDefault();
    if (school_name && city) {
      setFormData({
        ...formData,
        btnText: (
          <>
            <Spinner color="light" size="sm" /> Adding...
          </>
        ),
      });
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/schools/`,
          {
            school_name,
            address,
            board,
            mail_id,
            website,
            contact_no,
            city,
            pincode,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
          setFormData({
            ...formData,
            school_name: "",
            address: "",
            board: "",
            mail_id: "",
            website: "",
            contact_no: "",
            city: "",
            pincode: "",
            btnText: "Added",
          });

          setMsg({
            color: "success",
            message: (
              <>
                School Added! Redirecting to Admin Dashboard
                <Spinner color="success" size="sm" />
              </>
            ),
          });

          setTimeout(() => {
            history.push("/admin/");
          }, 3000);
        })
        .catch(err => {
          setFormData({
            school_name: "",
            address: "",
            board: "",
            mail_id: "",
            website: "",
            contact_no: "",
            city: "",
            pincode: "",
            btnText: (
              <>
                <MdNoteAdd /> Add School
              </>
            ),
          });

          console.log(err.response);

          setMsg({
            color: "danger",
            message: err.response.data,
          });

          setTimeout(() => {
            setMsg({ color: "", message: "" });
          }, 3000);
        });
    } else {
      setMsg({
        color: "danger",
        message: "Please fill School Name and City fields!",
      });

      setTimeout(() => {
        setMsg({ color: "", message: "" });
      }, 3000);
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
            <Col>
              <h2 className="text-center">Add New School</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name" className="mb-1">
                    School Name
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="name"
                    type="text"
                    placeholder="Enter school name"
                    onChange={handleChange("school_name")}
                    value={school_name}
                  />
                  <Row form>
                    <Col md={6}>
                      <Label for="board" className="mb-1">
                        Board
                      </Label>
                      <Input
                        className="mb-1 p-2"
                        id="board"
                        type="text"
                        placeholder="Enter school board"
                        onChange={handleChange("board")}
                        value={board}
                      />
                    </Col>
                    <Col md={6}>
                      <Label for="c_No" className="mb-1">
                        Contact Number
                      </Label>
                      <Input
                        className="mb-1 p-2"
                        id="c_No"
                        type="text"
                        placeholder="Enter school contact no."
                        onChange={handleChange("contact_no")}
                        value={contact_no}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <Label for="cities" className="mb-1">
                        City
                      </Label>
                      <Input
                        className="mb-1 p-2"
                        id="cities"
                        type="text"
                        placeholder="Enter school city"
                        onChange={handleChange("city")}
                        value={city}
                      />
                    </Col>
                    <Col md={6}>
                      <Label for="pin" className="mb-1">
                        Pincode
                      </Label>
                      <Input
                        className="mb-1 p-2"
                        id="pin"
                        type="text"
                        placeholder="Enter school pincode"
                        onChange={handleChange("pincode")}
                        value={pincode}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <Label for="mail_id" className="mb-1">
                        Mail Id
                      </Label>
                      <Input
                        className="mb-1 p-2"
                        id="mail_id"
                        type="text"
                        placeholder="Enter school mail id"
                        onChange={handleChange("mail_id")}
                        value={mail_id}
                      />
                    </Col>
                    <Col md={6}>
                      <Label for="website" className="mb-1">
                        Website
                      </Label>
                      <Input
                        className="mb-1 p-2"
                        id="website"
                        type="text"
                        placeholder="Enter school website"
                        onChange={handleChange("website")}
                        value={website}
                      />
                    </Col>
                  </Row>
                  <Label for="address" className="mb-1">
                    Address
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="address"
                    type="textarea"
                    placeholder="Enter school address"
                    onChange={handleChange("address")}
                    value={address}
                  />
                </FormGroup>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    {btnText}
                  </button>
                </div>
              </Form>
              <div className="text-center pt-3">
                <Link to="/admin/">Back to Admin Dashboard</Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default SchoolCreate;
