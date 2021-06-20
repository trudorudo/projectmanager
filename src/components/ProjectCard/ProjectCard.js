import React from 'react';
import { Link } from 'react-router-dom';
import { UPDATE_PROJECT } from '../../utils/constants';
import NewProjectModal from '../NewProjectModal/NewProjectModal';
import './projectCard.css'

const ProjectCard = props => {
    const { projectItem = {}, deleteProject, updateProject} = props;
    const { name = '', code = '', id = '' } = projectItem || {};

    const [open, setOpen] = React.useState(false);

    return (
        <div className='projectCard'>
            <div>
                <button
                    className='deleteBtn'
                    onClick={() => deleteProject(id)}
                >X</button>
            </div>
            <div onClick={() => setOpen(true)} className="projectName">{name}</div>
            <div>{code}</div>
            <div>
                <Link to={'/tasks/'+id} className="taskBtn"><button onClick={console.log('')}>Tasks</button></Link>             
            </div>
            <NewProjectModal
              open={open}
              setOpen={setOpen}
              projectModalAction={updateProject}
              title={UPDATE_PROJECT}
              projectItem={ projectItem }
              // isAddNewLoading={isAddNewLoading}
              // newProjectData={newProjectData}
            />
        </div>
        
    )
}

export default ProjectCard;

// use link instead of <a/>