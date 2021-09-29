import {List, InputItem, Toast, Picker, Button} from 'antd-mobile';
import {useState} from "react";
import {postJson} from "../utils/request";
import {useHistory} from "react-router-dom";
import {AttributePicker} from "./AttributePicker";
import {MinusOutlined} from "@ant-design/icons";
import {cloneAll} from "../utils/base";

function TaskCreate() {
  const history = useHistory();
  const [data,setData] = useState({name:'',desc:'',period_type:[1],awards_info:[]})
  const [attributeId,setAttributeId] = useState(0)
  let periodTypeArr = [{'value':1,'label':'不重复'},{'value':2,'label':'每天'},{'value':3,'label':'每周'},{'value':4,'label':'每月'}];

  const changeHandler = function(field){
    return (e)=>{
      setData({...data,[field]:e})
    }
  }

  const delAward = function(idx){
    return ()=>{
      data.awards_info.splice(idx,1)
      setData(cloneAll(data))
    }
  }

  const changeAttributeId=(e)=>{
    setAttributeId([e.value]);
    data.awards_info.push({name:e.label,id:e.value,value:0})
    setData(data);
  }

  const saveHandler=()=>{
    if (!data.name) {
      Toast.fail("任务名不能为空",1)
      return
    }

    Toast.loading("creating...",0);
    postJson("/task/create", {
      ...data,
      period_type:data.period_type[0],
      awards_info:JSON.stringify(data.awards_info)
    },(res)=>{
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
    <AttributePicker label='奖励' value={attributeId} onOkI={changeAttributeId}/>
    {data.awards_info.map((i,idx)=>{
      return <InputItem
        key={idx}
        placeholder="请填写奖励值"
        extra={<MinusOutlined onClick={delAward(idx)}/>}
      >{i.name}</InputItem>
    })}
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