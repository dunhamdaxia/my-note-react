import { Tabs } from "antd-mobile";
import TaskListItem from "./TaskListItem";

function TaskList() {
  const tabs = [
    { title: '待完成',status: 1 },
    { title: '已完成',status: 2 },
    { title: '全部',status: 0 },
  ];

  return <div>
    <div>
      <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
        {tabs.map((item)=>{
          return TaskListItem(item,item.status);
        })}
      </Tabs>
    </div>
  </div>
}

export default TaskList;