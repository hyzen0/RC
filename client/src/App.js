import { API } from "./backend";
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetch(`${API}api/auth/profile`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then(res => res.json())
        .then(data => {
          dispatch({ type: "USER", payload: data });
        });
      return <Redirect to="/" />;
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/school" component={School} />
      <Route path="/book" component={Book} />
      <Route path="/blog" component={Blog} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      {state ? (
        <Route path="/v1/user/profile" component={Profile} />
      ) : (
        <Redirect to="/signin" />
      )}
      {/* <Route path="*" component={NotFound} /> */}
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
