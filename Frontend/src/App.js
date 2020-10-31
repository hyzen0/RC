import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import About from "./pages/About";
import Blogs from "./pages/Blogs";

import Schools from "./components/Table/Schools";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
