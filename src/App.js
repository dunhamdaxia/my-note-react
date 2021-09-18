import './App.css';
import {useEffect, useState} from "react";
import {postJson} from "./utils/request";
import Login from "./user/login";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Register from "./user/register";


function App() {
  const [user,setUser] = useState(null)
  useEffect(() => {
    postJson("/check_token", {},(res)=>{
      if (res.status && parseInt(res.data.code) === 2) {
          setUser(res.data.user)
      }
    });
  });
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div>首页</div>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
