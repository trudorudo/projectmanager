import React, { useEffect } from 'react';
import ClipLoader from "react-spinners/BounceLoader";
import TaskCard from '../TaskCard';
import { ADD__NEW_TASK } from '../../utils/constants';
import NewTaskModal from '../NewTaskModal';

const TasksListComponent = (props) => {
   const {
      tasksListData,
      errorMsg,
      isFetchLoading,
      newTask,
      typesList,
      statusesList,

      getTasks,
      updateTask,
      deleteTask,
      saveTask,
      getTypes,
      getStatuses
   } = props;

   useEffect(() => {
      getTasks();
      getTypes();
      getStatuses();
   }, [getTasks, getTypes, getStatuses]);

   useEffect(() => {
      getTasks();
      setOpen(false);
   }, [newTask]);

   const [open, setOpen] = React.useState(false);
   return (
      <div className='tasksList'>
         {
            isFetchLoading ? <ClipLoader size={100} /> :
               <div>
                  {tasksListData && tasksListData.map(taskItem =>
                     <TaskCard
                        taskItem={taskItem}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                     />)}
               </div>
         }
         <button
            className='addNewBtn'
            type='button'
            onClick={() => setOpen(true)}
         > + Add New</button>
         <NewTaskModal
            open={open}
            setOpen={setOpen}
            title={ADD__NEW_TASK}
            taskModalAction={saveTask}
         />
      </div>
   )
}


export default TasksListComponent;