import { useEffect, useReducer, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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

// Import Reducer
import { reducer, initialState } from "./reducers/userReducer";

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "USER", payload: data });
        });
      return <Redirect to="/" />;
    }
  }, [token, dispatch]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/school" component={School} />
      <Route exact path="/book" component={Book} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      {token ? (
        <Route path="/v1/user/profile" component={Profile} />
      ) : (
        <Redirect to="/signin" />
      )}
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <Header />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
