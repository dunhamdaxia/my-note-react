import {List, InputItem, Toast, Picker, DatePicker} from 'antd-mobile';
import {useState} from "react";
import {postJson} from "../utils/request";
import {useHistory} from "react-router-dom";

function TaskCreate() {
  const history = useHistory();
  const [data,setData] = useState({name:'',desc:'',period_type:[1]})
  let periodTypeArr = [{'value':1,'label':'不重复'},{'value':2,'label':'每天'},{'value':3,'label':'每周'},{'value':4,'label':'每月'}];

  const changeHandler = function(field){
    return (e)=>{
      setData({...data,[field]:e})
    }
  }

  const saveHandler=()=>{
    if (!data.name) {
      Toast.fail("任务名不能为空",1)
      return
    }

    Toast.loading("creating...",0);
    postJson("/task/create", {...data,period_type:data.period_type[0]},(res)=>{
      if (res.status) {
        Toast.success("创建成功",1,()=>{
          history.push("/main/task")
        })
      } else {
        Toast.fail(res.msg,1)
      }
    },(res)=>{
      console.log(res)
    })
  }

  return <List renderHeader='新增任务'>
    <InputItem
      clear
      placeholder="task name"
      value={data.name}
      onChange={changeHandler('name')}
    >任务名称</InputItem>
    <InputItem
      clear
      type='text'
      placeholder="task desc"
      value={data.desc}
      onChange={changeHandler('desc')}
    >描述</InputItem>
    <Picker
      data={periodTypeArr}
      value={data.period_type}
      onOk={changeHandler('period_type')}
    >
      <List.Item arrow="horizontal">周期</List.Item>
    </Picker>
    <List.Item>
      <div
        className="b_b"
        onClick={saveHandler}
      >
        创建
      </div>
    </List.Item>
  </List>
}

export default TaskCreate;