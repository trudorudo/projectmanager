import React, { useState } from 'react';
import Modal from '../Modal';
import './newProjectModal.css';

const NewProjectModal = (props) => {
    const { open, setOpen, projectModalAction, title, projectItem = {} } = props;
    const { name = '', code = '', id = '' } = projectItem;
    const [projectName, setProjectName] = useState(name);
    const [projectCode, setProjectCode] = useState(code);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        projectModalAction({ id, projectName, projectCode });
    }

    return (
        <div className='newProjectModal'>
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
                            name='projectName'
                            value={projectName}
                            onChange={e => setProjectName(e.target.value)}
                        />
                        <p>Code</p>
                        <input
                            className='inputForm'
                            type='text'
                            name='projectCode'
                            value={projectCode}
                            onChange={e => setProjectCode(e.target.value)}
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


export default NewProjectModal;
