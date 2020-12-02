import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//Import react-toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// Import Layouts
import Header from "./layouts/Header";

// Import Screens
import Home from "./screens/Home";
import About from "./screens/About";
import Book from "./screens/Book";
import School from "./screens/School";
import Blog from "./screens/Blog";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Activate from "./screens/Activate";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPassword from "./screens/ResetPassword";
import Profile from "./screens/Profile";

const App = () => {
  return (
    <Router>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/school" component={School} />
        <Route exact path="/book" component={Book} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/users/activate/:token" component={Activate} />
        <Route exact path="/users/password/forget" component={ForgetPassword} />
        <Route
          exact
          path="/users/password/reset/:token"
          component={ResetPassword}
        />
        <Route exact path="/user/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
