import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Fields from "./Fields";
import SubmitButton from "./SubmitButton";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const context = useContext(UserContext);
  const history = useHistory();

  //initial value for fields
  const initialValues = {
    email: "",
    password: "",
  };

  //validating form fields
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string()
      .required("Required!")
      .min(6, "Password too short - should be of 6 characters."),
  });

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);

    //login user
    fetch("/api/auth/login", {
      method: "POST",
      headers: { Authorization: localStorage.getItem("jwt") },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.email) {
          toast(data.email, {
            type: "error",
          });
        } else {
          localStorage.setItem("jwt", JSON.stringify(data.token));
          history.push("/");
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
            <SubmitButton
              buttonName="SIGN IN"
              disabled={!formik.isValid || formik.isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
