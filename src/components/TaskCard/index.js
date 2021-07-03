import React from 'react';
import './taskCard.scss';
import NewTaskModal from '../NewTaskModal/NewTaskModal';
import { UPDATE_TASK } from '../../utils/constants';

const TaskCard = props => {
    const { taskItem, updateTask, deleteTask, typesList, statusesList } = props || {};
    const { id = '', name = '', code = '', description = '', type = '', status_id = '' } = taskItem || {}

    const [open, setOpen] = React.useState(false);

    const status = statusesList?.find(x => x.id === Number(status_id))

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
                <span style={{ backgroundColor: status?.color }} className="taskstatus">{status?.status_name}</span>
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
                typesList={typesList}
                statusesList={statusesList}
            />
        </div>
    )
}

export default TaskCard;