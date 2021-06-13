import React, { useEffect } from 'react';


const TasksListComponent = (props) => {
   const {
      tasksListData = {},
      errorMsg,
      isFetchLoading,
      getTasks
   } = props;

   useEffect(() => {
      getTasks()
   }, [getTasks]);


   return (
      <div>
      </div>
   )
}


export default TasksListComponent;