import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Schools from "./components/Table/Schools";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/schools" component={Schools} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
