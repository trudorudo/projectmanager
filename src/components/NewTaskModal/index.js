import React, { useState } from 'react';
import { CgSidebarOpen } from 'react-icons/cg';
import Modal from '../Modal';

const NewTaskModal = (props) => {
    const { open, setOpen, taskModalAction, title, taskItem = {} } = props;

    const [task, setTask] = useState(taskItem)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        taskModalAction(task);
        setOpen(false);
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
                            name='name'
                            value={task.name}
                            onChange={e => setTask((prevState) => ({ ...prevState, name: e.target.value }))}
                        />
                        <p>Code</p>
                        <input
                            className='inputForm'
                            type='text'
                            name='code'
                            value={task.code}
                            onChange={e => setTask((prevState) => ({ ...prevState, code: e.target.value }))}
                        />
                        <p>Type</p>
                        <select
                            className='inputForm'
                            // type='text'
                            name='type'
                            value={task.type}
                            onChange={e => setTask((prevState) => ({ ...prevState, type: e.target.value }))}
                        >
                            <option name="male"> SPIKE</option>
                            <option name="male"> Bug</option>
                            <option name="male"> Product Health</option>
                        </select>
                        <p>Status</p>
                        <select
                            className='inputForm'
                            // type='text'
                            name='status'
                            value={task.status}
                            onChange={e => setTask((prevState) => ({ ...prevState, task_status: e.target.value }))}
                        >
                            <option name="male"> TODO</option>
                            <option name="male"> In Progress</option>
                            <option name="male"> Testing</option>
                        </select>
                        <p>Description</p>
                        <input
                            className='inputForm'
                            type='text'
                            name='description'
                            value={task.description}
                            onChange={e => setTask((prevState) => ({ ...prevState, description: e.target.value }))}
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