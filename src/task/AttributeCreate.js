import {List, InputItem, Toast, Picker} from 'antd-mobile';
import {useEffect, useState} from "react";
import {postJson} from "../utils/request";
import {useHistory} from "react-router-dom";
import {useInit, useQuery} from "../components/Common";

function AttributeCreate() {
  const history = useHistory();
  const [data,setData] = useState({id:0,parent_id:[0],name:'',sort:0})
  const [parentArr,setParentArr] = useState([{label:'一级属性',value:0}])
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
    loadParent();
  })

  function loadParent(){
    Toast.loading("loading...")
    postJson("/attribute/page", {},(res)=>{
      let arr = [];
      res.data.map((item)=>{
        arr.push({value:item.id,label:item.name})
      })
      setParentArr(arr)
      Toast.hide();
    },(res)=>{
      Toast.fail(res)
    })
  }

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