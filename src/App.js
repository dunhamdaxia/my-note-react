import './App.css';
import {useEffect, useState} from "react";
import {postJson} from "./utils/request";
import Login from "./user/login";


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
    <div className="App">
      {user === null ?
        <Login/> :
        <div>个人首页</div>
      }
    </div>
  );
}

export default App;
