import { Formik, Form } from "formik";
import * as Yup from "yup";
import Fields from "./Fields";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { API } from "../../backend";

const SignUpForm = () => {
  const history = useHistory();

  //initial value for fields
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  //validating form fields
  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string()
      .required("Required!")
      .min(6, "Password too short - should be of minimum 6 characters."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Please enter the same password!")
      .required("Required!"),
  });

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);

    //registering user
    fetch(`${API}api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          toast(data.msg, {
            type: "error",
          });
          console.log(data.msg);
        } else {
          toast("Successfully Registered!", {
            type: "success",
          });
          console.log("User Registered");
          history.push("/signin");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {formik => {
        return (
          <Form className="form-group">
            <Fields
              htmlFor="name"
              labels="Fullname*"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
            />
            <Fields
              htmlFor="email"
              labels="Email*"
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
            />
            <Row>
              <Col md={6}>
                <Fields
                  htmlFor="password"
                  labels="Password*"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="AbKeyw"
                />
              </Col>
              <Col md={6}>
                <Fields
                  htmlFor="confirmPassword"
                  labels="Confirm Password*"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="AbKeyw"
                />
              </Col>
            </Row>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Sign Up
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
