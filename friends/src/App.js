import './App.css';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";

import Login from './components/Login'

function App() {
  return (
    <Router>
      <NavLink to='/login'>Log in</NavLink>
      <NavLink to='login'>Log out</NavLink>
    <Switch>
      <Route path='/login' component={Login}/>
    </Switch>
    </Router>
  )
}

export default App;
