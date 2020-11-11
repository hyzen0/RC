import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import Layout
import Header from "./layouts/Header";

// Import Pages
import Home from "./pages/Home";
import About from "./pages/About";
import School from "./pages/School";
import Book from "./pages/Book";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Import Auths
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

//Import react-toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// Import Context
import UserContext from "./components/context/UserContext";

const App = () => {
  const [user, setUser] = useState(null);

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
          <Route exact path="/school" component={School} />
          <Route exact path="/book" component={Book} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {user ? (
            <Route exact path="/v1/user/profile" component={Profile} />
          ) : (
            <Route exact path="*" component={NotFound} />
          )}

          <Route exact path="*" component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </UserContext.Provider>
    </Router>
  );
};

export default App;
