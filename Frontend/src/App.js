import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Schools from "./components/Table/Schools";
import UserContext from "./components/context/UserContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PrivateRoutes from "./auth/helper/PrivateRoutes";

const App = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch("/api/auth/profile", {
  //     method: "GET",
  //     headers: { Authorization: localStorage.getItem("jwt") },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser({
  //         name: data.name,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/schools" component={Schools} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/register" component={Register} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
};

export default App;
