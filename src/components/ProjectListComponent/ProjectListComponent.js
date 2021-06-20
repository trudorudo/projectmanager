import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/BounceLoader";
import { ADD_NEW_PROJECT } from '../../utils/constants';
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
    deleteProject,
    updateProject
  } = props;

  useEffect(() => {
    getProjects()
  }, [getProjects]);


  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getProjects();
    setOpen(false);
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
              onClick={() => setOpen(true)}
            > + Add New</button>
            <NewProjectModal
              open={open}
              setOpen={setOpen}
              projectModalAction={saveProject}
              isAddNewLoading={isAddNewLoading}
              newProjectData={newProjectData}
              title={ADD_NEW_PROJECT}
            />
          </div>
      }
    </div>
  )
}


export default ProjectListComponent;
