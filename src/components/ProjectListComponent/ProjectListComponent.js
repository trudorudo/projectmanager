import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/BounceLoader";
import { ADD_NEW_PROJECT } from '../../utils/constants';
import ProjectCard from '../ProjectCard/ProjectCard';
import NewProjectModal from '../NewProjectModal/NewProjectModal';
import './projectListComponent.css';
import { useToggle } from '../../hooks/useToggle';

const ProjectListComponent = (props) => {
  const {
    getProjects,
    errorMsg,
    projectListData,
    isFetchLoading,
    saveProject,
    isAddNewLoading,
    newProjectData,
    deleteProject,
    updateProject
  } = props;

  useEffect(() => {
    getProjects()
  }, [getProjects]);


  // const [open, setOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useToggle();

  useEffect(() => {
    getProjects();
    // setIsModalOpen(false);
  }, [newProjectData]);

  let [color, setColor] = useState("#ffffff");

  return (
    <div className='projectList'>
      {
        isFetchLoading ?
          <ClipLoader size={100} color={color} /> :
          <div>
            {projectListData && projectListData.map((projectItem, key) => (
              <ProjectCard
                projectItem={projectItem}
                key={key}
                deleteProject={deleteProject}
                updateProject={updateProject}
              />
            ))}
            <button
              className='addNewBtn'
              type='button'
              onClick={setIsModalOpen}
            > + Add New</button>
            <NewProjectModal
              open={isModalOpen}
              setOpen={setIsModalOpen}
              projectModalAction={saveProject}
              isAddNewLoading={isAddNewLoading}
              title={ADD_NEW_PROJECT}
            />
          </div>
      }
    </div>
  )
}


export default ProjectListComponent;
