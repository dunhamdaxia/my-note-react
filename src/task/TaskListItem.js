import {useEffect, useState} from "react";
import {Toast} from "antd-mobile";
import {postJson} from "../utils/request";

function TaskListItem(item,idx) {
  const pageNum = 10;
  const [data,setData] = useState({
    items:[],
    page:0
  });

  const loadTask = function () {
    Toast.loading("loading...",0);
    postJson("/task/page", {page:data.page,num:pageNum},(res)=>{
      if (res.status) {
        console.log(res)
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

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
    Content of {item.title} tab
  </div>
}

export default TaskListItem;