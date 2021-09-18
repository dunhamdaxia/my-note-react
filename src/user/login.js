import React, { useState } from 'react'
import {List, InputItem, Toast} from 'antd-mobile';
import {postJson} from "../utils/request";
import {useHistory} from "react-router-dom";
function Login() {
  const [data,setData] = useState({account:"",password:""});
  let history = useHistory();
  const loginHandler=()=>{
    if (!data.account) {
      Toast.fail("用户名不能为空",1)
      return
    }

    if (!data.password) {
      Toast.fail("密码不能为空",1)
      return
    }

    Toast.loading("login...",0);
    postJson("/login",{data},(res)=>{
      if (res.status) {
        Toast.success("登录成功",1,()=>{
          console.log("go to main")
        })
      } else {
        Toast.fail(res.msg,1)
      }
    },(res)=>{
      console.log(res)
    })
  }

  return <div>
    <List renderHeader={() => '登录你的人生日志'}>
      <InputItem
        clear
        placeholder="your name"
        value={data.account}
        onChange={(e)=>{setData({...data,account:e})}}
      >用户名</InputItem>
      <InputItem
        clear
        placeholder="password"
        type="password"
        value={data.password}
        onChange={(e)=>{setData({...data,password:e})}}
      >密码</InputItem>
      <List.Item>
        <div
          style={{ width: '100%', color: '#108ee9', textAlign: 'center', borderBottom: '1PX solid #ddd' }}
          onClick={loginHandler}
        >
           登录
        </div>
        <div
          style={{ width: '100%', color: '#108ee9', textAlign: 'center',  }}
          onClick={()=>{
            history.push("/register")
          }}
        >
          注册
        </div>
      </List.Item>
    </List>
  </div>
}

export default Login;