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
import Login from "./screens/Login";
import Register from "./screens/Register";
import Activate from "./screens/Activate";

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
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/users/activate/:token" component={Activate} />
        {/* <Route exact path="/user/profile" component={Private} /> */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
