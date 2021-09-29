import {List, Toast} from "antd-mobile";
import {useEffect, useState} from "react";
import {postJson} from "../utils/request";
import {useHistory} from "react-router-dom";

function Attributes() {
  const pageNum = 20;
  const [data,setData] = useState({items:[],page:0});
  const history = useHistory();

  const loadAttributes = function () {
    Toast.loading("loading...",0);
    postJson("/attribute/page", {page:data.page,num:pageNum},(res)=>{
      if (res.status) {
        data.items = data.items.concat(res.data)
        setData({...data})
        Toast.hide();
      } else {
        Toast.fail(res.msg,1)
      }
    },(res)=>{
      Toast.fail(res,1)
      console.log(res)
    })
  }

  useEffect(()=>{
    if (data.page === 0) {
      data.page++
      loadAttributes()
    }
  });

  if (data.items.length === 0) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
      暂无属性,点击右上角添加
    </div>
  }

  const linkHandle=function(id){
    return ()=>{
      history.push(`/main/attribute_create?id=${id}`)
    }
  }

  return <List className="my-list">
    {data.items.map((item,idx)=>{
      return <List.Item key={idx} onClick={linkHandle(item.id)}>
        { item.name}
      </List.Item>
    })}
  </List>
}

export default Attributes;