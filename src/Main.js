import React, {useState} from "react";
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import {useHistory, useRouteMatch,Switch,Route,useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import taskList from "./task/TaskList";

function Main() {
  let history = useHistory();
  const [open,setOpen] = useState(false)
  let leftMenuTmp = [
    {title:'任务',path:'task'},
    {title:'个人信息',path:'info'}
  ]
  const [leftMenu,setLeftMenu] = useState(leftMenuTmp)
  const onOpenChange = (...args) => {
    console.log(args);
    setOpen(!open)
  }

  const linkHandler = function (url) {
    return ()=>{
      history.push(`/main/${url}`)
    }
  }

  const sidebar = (<List>
    {leftMenu.map((i, index) => {
      return (<List.Item key={i.path}
                         // thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        onClick={linkHandler(i.path)}
                         multipleLine = {index === 0}
      >{i.title}</List.Item>);
    })}
  </List>);

  return <div>
      <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={onOpenChange}>my-note</NavBar>
      <div style={{position:'relative'}}>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
          sidebar={sidebar}
          open={open}
          onOpenChange={onOpenChange}
        >
          <Content />
        </Drawer>
      </div>
  </div>
}

function Content() {
  let { titleId } = useParams();
  switch (titleId) {
    case 'task':
      return taskList();
    case 'info':
      return <h3>222Requested topic ID: {titleId}</h3>;
    default:
      return <h3>未找到相关页面</h3>
  }
}

export default Main;