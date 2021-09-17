import React, { useState } from 'react'
import { List, InputItem } from 'antd-mobile';
function Login() {
  const [data,setData] = useState({account:"",password:""});

  return <div>
    <List renderHeader={() => 'Customize to focus'}>
      <InputItem

        clear
        placeholder="auto focus"
      >标题</InputItem>
      <InputItem
        clear
        placeholder="click the button below to focus"
      >标题</InputItem>
      <List.Item>
        <div
          style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
          // onClick={this.handleClick}
        >
          click to focus
        </div>
      </List.Item>
    </List>
  </div>
}

export default Login;