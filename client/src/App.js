import "./App.css";
import { Link, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Teacher from "./components/views/Dashboard/Teacher";
import Student from "./components/views/Dashboard/Student";
import Auth from "./hoc/auth";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/teacher-dashboard" component={Teacher} />
        <Route exact path="/student-dashboard" component={Student} />
      </Switch>
    </div>
  );
}

export default App;
