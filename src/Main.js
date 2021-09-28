import React, {useState} from "react";
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import {useHistory, useRouteMatch,Switch,Route,useParams} from "react-router-dom";
import TaskList from "./task/TaskList";
import {PlusOutlined} from "@ant-design/icons";
import TaskCreate from "./task/TaskCreate";

function Main() {
  let history = useHistory();
  let urlMatch = useRouteMatch();
  const [open,setOpen] = useState(false)
  let leftMenuTmp = [
    {title:'任务',path:'task'},
    {title:'个人信息',path:'info'},
  ]
  const [leftMenu,setLeftMenu] = useState(leftMenuTmp)
  const onOpenChange = (...args) => {
    console.log(args);
    setOpen(!open)
  }

  const linkHandler = function (url) {
    return ()=>{
      setOpen(false)
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

  const rightIcon = function() {
    switch (urlMatch.url) {
      case '/main/task':
        return [<PlusOutlined key='po' onClick={()=>{history.push('/main/task_create')}}/>]
      default:
        return []
    }
  }

  return <div>
      <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={onOpenChange} rightContent={rightIcon()}>my-note</NavBar>
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
      return <TaskList/>;
    case 'task_create':
      return <TaskCreate/>;
    case 'info':
      return <h3>222Requested topic ID: {titleId}</h3>;
    default:
      return <h3>未找到相关页面</h3>
  }
}

export default Main;