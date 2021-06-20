import React, { useEffect } from 'react';
import ClipLoader from "react-spinners/BounceLoader";
import TaskCard from '../TaskCard';
import { ADD__NEW_TASK } from '../../utils/constants';
import NewTaskModal from '../NewTaskModal';
import {useParams} from 'react-router-dom'
import useTraceUpdate from '../../hooks/useTraceUpdate'
import {batch} from 'react-redux'

const TasksListComponent = (props) => {
   const {
      tasksListData,
      errorMsg,
      isFetchLoading,
      typesList,
      statusesList,

      getTasks,
      updateTask,
      deleteTask,
      saveTask,
      getTypes,
      getStatuses
   } = props;

   const {project_id} = useParams()
   useTraceUpdate(props)

   useEffect(() => {
      batch(() => {
         getTasks(project_id || '');
         getTypes();
         getStatuses();
      })
   }, [getTasks, getTypes, getStatuses]);

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
         {project_id && <button
            className='addNewBtn'
            type='button'
            onClick={() => setOpen(true)}
         > + Add New</button>}
         {project_id && <NewTaskModal
            open={open}
            setOpen={setOpen}
            title={ADD__NEW_TASK}
            taskModalAction={saveTask}
         />}
      </div>
   )
}


export default TasksListComponent;