import './App.css';
import {useEffect, useState} from "react";
import {postJson} from "./utils/request";
import Login from "./user/Login";
import {HashRouter, Switch, Route} from "react-router-dom";
import Register from "./user/Register";
import Main from "./Main";

function App(){
  const [user,setUser] = useState(null)
  useEffect(() => {
    postJson("/check_token", {},(res)=>{
      if (res.status && parseInt(res.data.code) === 2) {
          // setUser(res.data.user)
      }
      console.log(localStorage.getItem("note-token"),222)
    });
  });
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
