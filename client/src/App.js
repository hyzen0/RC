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
import Footer from "./layouts/Footer";

// Import Screens
import Home from "./screens/Home";
import Ngo from "./screens/Ngo";
import Book from "./screens/Book";
import School from "./screens/School";
import Blog from "./screens/Blog";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Activate from "./screens/Activate";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPassword from "./screens/ResetPassword";
import Profile from "./screens/Profile";
import AdminPannel from "./screens/AdminPannel";
import BlogPost from "./components/BlogPost";

// Import Protected routes
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import BlogCreate from "./components/admin/Blogs/BlogCreate";
import SchoolCreate from "./components/admin/Schools/SchoolCreate";
import BlogEdit from "./components/admin/Blogs/BlogEdit";
import SchoolEdit from "./components/admin/Schools/SchoolEdit";

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
        <Route exact path="/ngo/" component={Ngo} />
        <Route exact path="/school/" component={School} />
        <Route exact path="/book/" component={Book} />
        <Route exact path="/blog/" component={Blog} />
        <Route exact path="/blog/:id/" component={BlogPost} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/register/" component={Register} />
        <Route exact path="/users/activate/:token/" component={Activate} />
        <Route
          exact
          path="/users/password/forget/"
          component={ForgetPassword}
        />
        <Route
          exact
          path="/users/password/reset/:token/"
          component={ResetPassword}
        />
        <PrivateRoute exact path="/user/profile/" component={Profile} />
        <AdminRoute exact path="/admin/" component={AdminPannel} />
        <AdminRoute exact path="/admin/newschool/" component={SchoolCreate} />
        <AdminRoute exact path="/admin/school/:id/" component={SchoolEdit} />
        <AdminRoute exact path="/admin/newblog/" component={BlogCreate} />
        <AdminRoute exact path="/admin/blog/:id/" component={BlogEdit} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
