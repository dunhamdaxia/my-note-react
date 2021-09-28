import {useEffect, useState} from "react";
import {Toast,List,Checkbox} from "antd-mobile";
import {postJson} from "../utils/request";
import {cloneAll} from "../utils/base";

function TaskListItem(item,status) {
  const pageNum = 10;
  const [data,setData] = useState({
    items:[],
    page:0
  });

  const loadTask = function () {
    Toast.loading("loading...",0);
    postJson("/task/page", {page:data.page,num:pageNum,status},(res)=>{
      if (res.status) {
        data.items = data.items.concat(res.data)
        setData({...data})
        Toast.hide();
      } else {
        Toast.fail(res.msg,1)
      }
    },(res)=>{
      console.log(res)
    })
  }

  useEffect(()=>{
    if (data.page === 0) {
      data.page++
      loadTask()
    }
  });

  if (data.items.length === 0) {
    return <div key={status} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
      Content of {item.title} tab
    </div>
  }

  const onCheck=(item)=>{
    item.status = 2
    setData(cloneAll(data))
  }

  return <List key={status} className="my-list">
    {data.items.map((item,idx)=>{
      return <List.Item key={idx} extra={item.desc}><Checkbox key={idx} defaultChecked={parseInt(item.status) === 2} disabled={parseInt(item.status) === 2} onChange={() => onCheck(item)}>
        { item.name}
      </Checkbox></List.Item>
    })}
  </List>
}

export default TaskListItem;