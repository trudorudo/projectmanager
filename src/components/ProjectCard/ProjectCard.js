import React from 'react';
import './projectCard.css'

const ProjectCard = props => {
    const { projectItem = {}, deleteProject } = props;
    const { name = '', code = '', id = '' } = projectItem || {};
    return (
        <div className='projectCard'>
            <div>
                <button
                    className='deleteBtn'
                    onClick={() => deleteProject(id)}
                >X</button>
            </div>
            <div>{name}</div>
            <div>{code}</div>
            <div>
                <a href="#" className="taskBtn"><button onClick={console.log('test')}>Tasks</button></a>
            </div>
        </div>
    )
}

export default ProjectCard;