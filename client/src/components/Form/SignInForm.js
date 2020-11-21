import { API } from "../../backend";
import { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Fields from "./Fields";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const SignInForm = () => {
  const { state, dispatch } = useContext(UserContext);
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
    fetch(`${API}api/auth/login`, {
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
        } else {
          localStorage.setItem("jwt", data.token);
          dispatch({ type: "USER", payload: data.token });
          toast("Successfully Logged In!", {
            type: "success",
          });
          history.push("/v1/user/profile");
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
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Sign In
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
