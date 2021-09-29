import {useState} from "react";
import {List, Picker, Toast} from "antd-mobile";
import {postJson} from "../utils/request";
import {useInit} from "../components/Common";

export const AttributePicker=props=>{
  const [parentArr,setParentArr] = useState([{label:'一级属性',value:0}])
  useInit(()=>{
    loadParent()
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

  const onOk=(e)=>{
    props.onOk && props.onOk(e)
    if (props.onOkI) {
      try {
        parentArr.map((i)=>{
          if (e[0] === i.value) {
            throw i
          }
        })
      } catch (i) {
        props.onOkI(i)
      }
    }
  }

  return <Picker
    data={parentArr}
    value={props.value}
    onOk={onOk}
  >
    <List.Item arrow="horizontal">{props.label}</List.Item>
  </Picker>
}