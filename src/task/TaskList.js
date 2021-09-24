import { Tabs } from "antd-mobile";
import TaskListItem from "./TaskListItem";

function TaskList() {
  const tabs = [
    { title: '待完成' },
    { title: '已完成' },
    { title: '全部' },
  ];

  return <div>
    <div>
      <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
        {tabs.map((i,idx)=>{
          return TaskListItem(i,idx);
        })}
      </Tabs>
    </div>
  </div>
}

export default TaskList;