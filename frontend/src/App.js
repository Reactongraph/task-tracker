import React, { useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  let history = useHistory();
  const location = useLocation();

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  },[user]);

  return (
    <Switch location={location} key={location.pathname}>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
