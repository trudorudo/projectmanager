import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './newProjectModal.css';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'lightgray',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '25rem'
    },
}));


const NewProjectModal = (props) => {
    const { open, handleClose, saveProject, isAddNewLoading } = props;
    const classes = useStyles();
    const [projectName, setProjectName] = useState('');
    const [projectCode, setProjectCode] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        saveProject({ projectName, projectCode });
    }

    return (
        <div className='newProjectModal'>
            <div>
                {isAddNewLoading && <p> loading...</p>}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Add New Project</h2>
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
                        </div>
                    </Fade>
                </Modal>

            </div>
        </div>
    )
}


export default NewProjectModal;
