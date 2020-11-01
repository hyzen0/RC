import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Fields from "./Fields";
import SubmitButton from "./SubmitButton";
import RadioButton from "./RadioButton";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const history = useHistory();

  //initial value for fields
  const initialValues = {
    name: "",
    email: "",
    password: "",
    gender: "",
  };

  //validating form fields
  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string()
      .required("Required!")
      .min(6, "Password too short - should be of 6 characters.")
      .max(15, "Password can have maximum 15 characters!"),
    gender: Yup.string(),
  });

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);

    //registering user
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User Registered");
        if (data.emailerror) {
          toast(data.emailerror, {
            type: "error",
          });
        } else {
          toast("Successfully Registered!", {
            type: "success",
          });
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

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
