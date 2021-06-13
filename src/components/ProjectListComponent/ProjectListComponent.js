import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/BounceLoader";
import ProjectCard from '../ProjectCard/ProjectCard';
import NewProjectModal from '../NewProjectModal/NewProjectModal';
import './projectListComponent.css';

const ProjectListComponent = (props) => {
  const {
    getProjects,
    errorMsg,
    projectListData,
    isFetchLoading,
    saveProject,
    isAddNewLoading,
    newProjectData,
    deleteProject
  } = props;

  useEffect(() => {
    getProjects()
  }, [getProjects]);

  useEffect(() => {
    getProjects();
    handleClose();
  }, [newProjectData]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              />
            ))}
            <button
              className='addNewBtn'
              type='button'
              onClick={handleOpen}
            > + Add New</button>
            <NewProjectModal
              open={open}
              handleClose={handleClose}
              saveProject={saveProject}
              isAddNewLoading={isAddNewLoading}
              newProjectData={newProjectData}
            />
          </div>
      }
    </div>
  )
}


export default ProjectListComponent;
