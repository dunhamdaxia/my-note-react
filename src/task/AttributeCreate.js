import {List, InputItem, Toast, Picker} from 'antd-mobile';
import {useState} from "react";
import {postJson} from "../utils/request";
import {useHistory} from "react-router-dom";

function AttributeCreate() {
  const history = useHistory();
  const [data,setData] = useState({id:0,parent_id:0,name:'',sort:0})
  const [parentArr,setParentArr] = useState([])
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

  return <List renderHeader='新增属性'>
    <Picker
      data={parentArr}
      value={data.parent_id}
      onOk={changeHandler('parent_id')}
    >
      <List.Item arrow="horizontal">父属性</List.Item>
    </Picker>
    <InputItem
      clear
      placeholder="attribute name"
      value={data.name}
      onChange={changeHandler('name')}
    >属性名</InputItem>
    <InputItem
      clear
      placeholder="sort 越大越靠前"
      value={data.sort}
      onChange={changeHandler('sort')}
    >排序</InputItem>
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

export default AttributeCreate;