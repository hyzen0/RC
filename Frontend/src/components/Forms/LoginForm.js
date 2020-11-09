import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Fields from "./Fields";
import SubmitButton from "./SubmitButton";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });

<<<<<<< HEAD
  const {
    name,
    email,
    password,
    error,
    success,
    loading,
    didRedirect,
  } = values;

  const handelChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        console.log("DATA", data);
        if (data.token) {
          // let sessionToken = data.token
          authenticate(data, () => {
            console.log("TOKEN ADDED");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
          });
=======
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);

    //login user
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email || data.passworderror) {
          toast(data.email || data.passworderror, {
            type: "error",
          });
        } else {
          context.setUser({
            token: data.token,
            name: data.person.name,
          });
          localStorage.setItem("jwt", JSON.stringify(data.token));
          history.push("/");
          toast("Successfully Logged In!", {
            type: "success",
          });
>>>>>>> d3aefbc5607546d55e7e865f86cfe42946b84576
        }
      })
      .catch(e => console.log(e));
  };
  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingmesage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className=" col-md-6 offset-sm-3 text-left">
          <form>
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
    <Base title="Welcome  To Sign in Page" description="T-shit Store">
      {loadingmesage()}

      {signInForm()}
      <p className="text-center">{JSON.stringify(values)}</p>
      {performRedirect()}
    </Base>
  );
};

export default Login;
// const LoginForm = () => {
//   const context = useContext(UserContext);
//   const history = useHistory();

//   //initial value for fields
//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   //validating form fields
//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email format").required("Required!"),
//     password: Yup.string()
//       .required("Required!")
//       .min(6, "Password too short - should be of 6 characters."),
//   });

//   const onSubmit = (values, onSubmitProps) => {
//     onSubmitProps.setSubmitting(false);

//     //login user
//     fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(values),
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//         if (data.email) {
//           toast(data.email, {
//             type: "error",
//           });
//         } else {
//           context.setUser({
//             token: localStorage.setItem("jwt", JSON.stringify(data.token)),
//           });
//           history.push("/");
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
//             <SubmitButton
//               buttonName="SIGN IN"
//               disabled={!formik.isValid || formik.isSubmitting}
//             />
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// };
