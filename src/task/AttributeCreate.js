import {InputItem, List, Toast} from 'antd-mobile';
import {useState} from "react";
import {postJson} from "../utils/request";
import {useHistory} from "react-router-dom";
import {useInit, useQuery} from "../components/Common";
import {AttributePicker} from "./AttributePicker";

function AttributeCreate() {
  const history = useHistory();
  const [data,setData] = useState({id:0,parent_id:[0],name:'',sort:0})
  const query = useQuery();
  const changeHandler = function(field){
    return (e)=>{
      setData({...data,[field]:e})
    }
  }

  useInit(()=>{
    if (query.id) {
      loadInfo()
    }
  })

  function loadInfo(){
    Toast.loading("loading...")
    postJson("/attribute/info",{id:parseInt(query.id)},(res)=>{
      setData(res.data)
      Toast.hide()
    },(res)=>{
      Toast.fail(res)
    })
  }

  const saveHandler=()=>{
    if (!data.name) {
      Toast.fail("属性名不能为空",1)
      return
    }

    Toast.loading("saving...",0);
    postJson("/attribute/save", {...data,parent_id:data.parent_id[0]},(res)=>{
      if (res.status) {
        Toast.success("保存成功",1,()=>{
          history.push("/main/attributes")
        })
      } else {
        Toast.fail(res.msg,1)
      }
    },(res)=>{
      console.log(res)
    })
  }

  return <List renderHeader='新增属性'>
    <AttributePicker label='父元素' value={data.parent_id} onOk={changeHandler('parent_id')}/>
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
      defaultValue={data.sort}
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