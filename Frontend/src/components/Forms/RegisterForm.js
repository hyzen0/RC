import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Fields from "./Fields";
import SubmitButton from "./SubmitButton";
import RadioButton from "./RadioButton";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { register } from "../../auth/helper";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

<<<<<<< HEAD
  const handelChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    register({ name, email, password })
      .then(data => {
        console.log("DATA", data);
        if (data.email === email) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            success: true,
=======
    //registering user
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.emailerror) {
          toast(data.emailerror, {
            type: "error",
>>>>>>> d3aefbc5607546d55e7e865f86cfe42946b84576
          });
          console.log(data.emailerror);
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
<<<<<<< HEAD
=======
          console.log("User Registered");
          history.push("/signin");
>>>>>>> d3aefbc5607546d55e7e865f86cfe42946b84576
        }
      })
      .catch(e => console.log(e));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className=" col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account Created Successfully. Please
            <Link to="/Signin"> Login </Link>Now.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className=" col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check all fields again
          </div>
        </div>
      </div>
    );
  };

  const RegisterForm = () => {
    return (
      <div className="row">
        <div className=" col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={handelChange("name")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handelChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                value={password}
                onChange={handelChange("password")}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="brn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign Up Page" description="A Signup for Sage Member">
      {successMessage()}
      {errorMessage()}
      {RegisterForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Register;

//validating form fields
//   const validationSchema = Yup.object({
//     name: Yup.string().required("Required!"),
//     email: Yup.string().email("Invalid email format").required("Required!"),
//     password: Yup.string()
//       .required("Required!")
//       .min(6, "Password too short - should be of 6 characters.")
//       .max(15, "Password can have maximum 15 characters!"),
//     gender: Yup.string(),
//   });

//   const onSubmit = (values, onSubmitProps) => {
//     onSubmitProps.setSubmitting(false);

//     //registering user
//     fetch("/api/auth/register", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log("User Registered");
//         if (data.emailerror) {
//           toast(data.emailerror, {
//             type: "error",
//           });
//         } else {
//           toast("Successfully Registered!", {
//             type: "success",
//           });
//           history.push("/signin");
//         }
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//       validateOnMount
//     >
//       {formik => {
//         return (
//           <Form className="form-group">
//             <Fields
//               htmlFor="name"
//               labels="Fullname*"
//               type="text"
//               id="name"
//               name="name"
//               placeholder="John Doe"
//             />
//             <Fields
//               htmlFor="email"
//               labels="Email*"
//               type="email"
//               id="email"
//               name="email"
//               placeholder="johndoe@example.com"
//             />
//             <Fields
//               htmlFor="password"
//               labels="Password*"
//               type="password"
//               id="password"
//               name="password"
//               placeholder="AbKeyw"
//             />
//             <RadioButton htmlFor="gender" label="Gender" name="gender" />
//             <SubmitButton
//               buttonName="REGISTER"
//               disabled={!formik.isValid || formik.isSubmitting}
//             />
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// };
