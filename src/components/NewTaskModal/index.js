import React, { useState } from 'react';
import Modal from '../Modal';
import {useParams} from 'react-router-dom'

const NewTaskModal = (props) => {
    const { open, setOpen, taskModalAction, title, taskItem = {} } = props;
    const { name = '', code = '', id = '', description = '' } = taskItem;
    const {project_id} = useParams()
    const [taskName, setTaskName] = useState(name);
    const [taskCode, setTaskCode] = useState(code);
    const [taskStatus, setTaskStatus] = useState('');
    const [taskType, setTaskType] = useState('');
    const [taskDescription, setTaskDescription] = useState(description);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        taskModalAction({ id, project_id, taskName, taskCode, taskStatus, taskType, taskDescription });
    }
    return (
        <div className='newTaskModal'>
            {open &&
                <Modal
                    title={title}
                    onClose={() => setOpen(false)}
                >
                    <form onSubmit={handleSubmit}>
                        <p>Name</p>
                        <input
                            className='inputForm'
                            type='text'
                            name='taskName'
                            value={taskName}
                            onChange={e => setTaskName(e.target.value)}
                        />
                        <p>Code</p>
                        <input
                            className='inputForm'
                            type='text'
                            name='TaskCode'
                            value={taskCode}
                            onChange={e => setTaskCode(e.target.value)}
                        />
                        <p>Type</p>
                        <select
                            className='inputForm'
                            // type='text'
                            name='type'
                            value={taskType}
                            onChange={e => setTaskType(e.target.value)}
                        >
                            <option name="male"> SPIKE</option>
                            <option name="male"> Bug</option>
                            <option name="male"> Product Health</option>
                        </select>
                        <p>Status</p>
                        <select
                            className='inputForm'
                            // type='text'
                            name='Status'
                            value={taskStatus}
                            onChange={e => setTaskStatus(e.target.value)}
                        >
                            <option name="male"> TODO</option>
                            <option name="male"> In Progress</option>
                            <option name="male"> Testing</option>
                        </select>
                        <p>Description</p>
                        <input
                            className='inputForm'
                            type='text'
                            name='TaskCode'
                            value={taskDescription}
                            onChange={e => setTaskDescription(e.target.value)}
                        />
                        <input
                            type='submit'
                            className='submitBtn'
                        />
                    </form>
                </Modal>}
        </div>
    )
}
export default NewTaskModal;