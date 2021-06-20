import React from 'react';
// import './taskCard.scss'
import localStyle from './taskCard.scss';
import NewTaskModal from '../NewTaskModal';
import { UPDATE_TASK } from '../../utils/constants';

const TaskCard = props => {
    const { taskItem, updateTask, deleteTask } = props || {};
    const { id = '', name = '', code = '', description = '', type = '', task_status = '' } = taskItem || {}

    const [open, setOpen] = React.useState(false);

    return (
        <div className='taskCard'>
            <div className='taskInfo'>
                <button
                    className='deleteBtn'
                    onClick={() => deleteTask(id)}
                >X</button>
                <span onClick={() => setOpen(true)}> {name} </span>
                <span> {code} </span>
                <span> {type} </span>
                <span className={`${localStyle.taskstatus} ${localStyle.inprogress}`} >{task_status}</span>
            </div>
            <div className='taskDescriprtion'>
                {description}
            </div>
            <NewTaskModal
                open={open}
                setOpen={setOpen}
                taskModalAction={updateTask}
                title={UPDATE_TASK}
                taskItem={taskItem}
            />
        </div>
    )
}

export default TaskCard;