import React, { useEffect } from 'react';
import ClipLoader from "react-spinners/BounceLoader";
import TaskCard from '../TaskCard';
import { ADD__NEW_TASK } from '../../utils/constants';
import NewTaskModal from '../NewTaskModal/NewTaskModal';
import { useParams } from 'react-router-dom'
import useTraceUpdate from '../../hooks/useTraceUpdate'
import { batch } from 'react-redux'
import {useDoubleClick} from '../../hooks/useDoubleClick'

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

   const { project_id } = useParams()
   useTraceUpdate(props)

   useEffect(() => {
      batch(() => {
         getTasks(project_id || '');
         getTypes();
         getStatuses();
      })
   }, [getTasks, getTypes, getStatuses]);

   const [open, setOpen] = React.useState(false);

   const handleOpenModal = useDoubleClick(() => setOpen(true), () => alert('double click!'), 500)

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
                        typesList={typesList}
                        statusesList={statusesList}
                     />)}
               </div>
         }
         {project_id && <button
            className='addNewBtn'
            type='button'
            onClick={handleOpenModal}
         > + Add New</button>}
         {project_id && <NewTaskModal
            open={open}
            setOpen={setOpen}
            title={ADD__NEW_TASK}
            taskItem={{ project_id: project_id }}
            taskModalAction={saveTask}
            typesList={typesList}
            statusesList={statusesList}
         />}
      </div>
   )
}


export default TasksListComponent;