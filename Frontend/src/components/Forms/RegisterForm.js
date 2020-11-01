import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Fields from "./Fields";
import SubmitButton from "./SubmitButton";
import RadioButton from "./RadioButton";
import axios from "axios";
import { Alert } from "reactstrap";
import { Redirect } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
  gender: "",
};

const onSubmit = (values, onSubmitProps) => {
  // alert(JSON.stringify(values));
  onSubmitProps.setSubmitting(false);

  //registering user
  axios
    .post("/api/auth/register", values)
    .then((data) => {
      console.log(data);
      if (data.emailerror) {
        return <Alert color="danger">{data.emailerror}</Alert>;
      } else {
        return <Redirect to="/signin" />;
      }
    })
    .catch((error) => console.log(error.response));
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  password: Yup.string()
    .required("Required!")
    .min(6, "Password too short - should be of 6 characters.")
    .max(15, "Password can have maximum 15 characters!"),
  gender: Yup.string(),
});

const RegisterForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {(formik) => {
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
            <Fields
              htmlFor="password"
              labels="Password*"
              type="password"
              id="password"
              name="password"
              placeholder="AbKeyw"
            />
            <RadioButton htmlFor="gender" label="Gender" name="gender" />
            <SubmitButton
              buttonName="REGISTER"
              disabled={!formik.isValid || formik.isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
