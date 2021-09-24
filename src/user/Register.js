import React, { useState } from 'react'
import {List, InputItem, Toast, DatePicker} from 'antd-mobile';
import {postJson} from "../utils/request";
import {useHistory} from "react-router-dom";
import {formatDate} from "../utils/time";

function Register() {
  const [data,setData] = useState({phone:'',birthday:'',name:'',height:0,weight:0,account:'',password:'',re_password:''});

  const [birthDate,setBirthDate] = useState(new Date());
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

    if (data.password !== data.re_password) {
      Toast.fail("两次密码不一致",1)
      return
    }

    if (!data.name) {
      Toast.fail("请输入姓名",1)
      return
    }

    data.height = data.height ? parseInt(data.height) : 0;
    data.weight = data.weight ? parseInt(data.weight) : 0;

    Toast.loading("register...",0);
    postJson("/register",data,(res)=>{
      if (res.status) {
        Toast.success("注册成功",1,()=>{
          history.push("/login")
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
      if (field === 'birthday' && e) {
        let time = new Date(Date.parse(e));

        setBirthDate(time)
        e = formatDate(time);
      }
      setData({...data,[field]:e})
    }
  }

  return <div>
    <List renderHeader='注册开启你的人生日志'>
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
        placeholder="password"
        type="password"
        value={data.re_password}
        onChange={changeHandler('re_password')}
      >确认密码*</InputItem>
      <InputItem
        clear
        placeholder="phone"
        type="phone"
        value={data.phone}
        onChange={changeHandler('phone')}
      >电话</InputItem>
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
      >身高(cm)</InputItem>
      <InputItem
        clear
        placeholder="weight"
        value={data.weight ? data.weight : ''}
        onChange={changeHandler('weight')}
      >体重(kg)</InputItem>
      <DatePicker
        mode="date"
        title="出生日期"
        extra="出生日期"
        value={birthDate}
        minDate={new Date(1980, 1, 1, 0, 0, 0)}
        onChange={changeHandler('birthday')}
      >
        <List.Item arrow="horizontal">出生日期</List.Item>
      </DatePicker>
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