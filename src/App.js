import './App.css';
import Login from "./user/Login";
import {HashRouter, Switch, Route, useParams} from "react-router-dom";
import Register from "./user/Register";
import Main from "./Main";

function App(){
  return <HashRouter>
    <Switch>
      <Route path="/main/:titleId">
        <Main/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/register">
        <Register/>
      </Route>
      <Route path="*">
        <h3>404</h3>
      </Route>
    </Switch>

  </HashRouter>
}

export default App;
