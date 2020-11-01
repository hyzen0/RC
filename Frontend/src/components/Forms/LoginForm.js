import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Fields from "./Fields";
import SubmitButton from "./SubmitButton";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

const LoginForm = () => {
  const context = useContext(UserContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string()
      .required("Required!")
      .min(6, "Password too short - should be of 6 characters."),
  });

  const onSubmit = (values, onSubmitProps) => {
    // alert(JSON.stringify(values));
    onSubmitProps.setSubmitting(false);

    //login user
    axios({
      method: "POST",
      url: "/api/auth/login",
      headers: { Authorization: localStorage.getItem("jwt") },
      data: values,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("jwt", JSON.stringify(res.data.token));
        context.setUser({
          email: res.user.email,
        });
      })
      .catch((err) => console.log(err));
  };

  if (context.user?.email) {
    return <Redirect to="/" />;
  }

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
