import "./App.css";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Friendslist from "./components/FriendsList";
import Login from "./components/Login";

function App() {
  const logout = () => {
    localStorage.removeItem("token");
  };
  return (
    <Router>
      <NavLink to="/login">Log in</NavLink>
      <NavLink onClick={logout} to="login">
        Log out
      </NavLink>
      <PrivateRoute path="/friends" component={Friendslist} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
}

export default App;
