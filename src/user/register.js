import React, { useState } from 'react'
import {List, InputItem, Toast} from 'antd-mobile';
import {postJson} from "../utils/request";
import {useHistory} from "react-router-dom";

function Register() {
  const [data,setData] = useState({phone:'',birthday:'',name:'',height:0,weight:0,account:'',password:''});
  let history = useHistory();
  const registerHandler=()=>{
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

  const changeHandler = function(field){
    return (e)=>{
      console.log(field,e)
      setData({...data,[field]:e})
    }
  }

  return <div>
    <List renderHeader={() => '注册开启你的人生日志'}>
      <InputItem
        clear
        placeholder="your name"
        value={data.account}
        onChange={changeHandler('account')}
      >用户名*</InputItem>
      <InputItem
        clear
        placeholder="password"
        type="password"
        value={data.password}
        onChange={changeHandler('password')}
      >密码*</InputItem>
      <InputItem
        clear
        placeholder="phone"
        type="phone"
        value={data.phone}
        onChange={changeHandler('phone')}
      >电话*</InputItem>
      <InputItem
        clear
        placeholder="name"
        value={data.name}
        onChange={changeHandler('name')}
      >姓名*</InputItem>
      <InputItem
        clear
        placeholder="height"
        value={data.height ? data.height : ''}
        onChange={changeHandler('height')}
      >身高</InputItem>
      <List.Item>
        <div
          className="b_b"
          onClick={registerHandler}
        >
          注册
        </div>
      </List.Item>
    </List>
  </div>
}

export default Register;