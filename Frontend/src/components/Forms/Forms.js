import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  email: "",
  password: "",
};
const onSubmit = (values, onSubmitProps) => {
  console.log(values);
  onSubmitProps.setSubmitting(false);
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required!"),
  password: Yup.string()
    .required("Required!")
    .min(6, "Password too short - should be of 6 characters."),
});

const Forms = () => {
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
            <label htmlFor="email" className="mb-0">
              Email*
            </label>
            <div className="pb-3">
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter email here"
              />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <label htmlFor="password" className="mb-0">
              Password*
            </label>
            <div className="pb-3">
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter password here"
              />
              <ErrorMessage name="password" component={TextError} />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn buttons px-3"
                style={{ width: "10em" }}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                SIGN IN
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Forms;
