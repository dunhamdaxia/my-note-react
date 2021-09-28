import {Checkbox, List} from "antd-mobile";
import {useState} from "react";

function Attributes() {
  const [data,setData] = useState({items:[],page:0});

  if (data.items.length === 0) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
      暂无属性,点击右上角添加
    </div>
  }

  return <List className="my-list">
    {data.items.map((item,idx)=>{
      return <List.Item key={idx} extra={item.desc}>
        { item.name}
      </List.Item>
    })}
  </List>
}

export default Attributes;