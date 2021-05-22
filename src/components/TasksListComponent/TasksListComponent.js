import React from 'react';
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

const TasksListComponent = (props) => {
    const icon = props.theme === "light" ? <HiMoon size={30} /> : <CgSun size={30} />;
    return(
       <div>
          TasksListComponent
       </div>
    )
}


export default TasksListComponent;