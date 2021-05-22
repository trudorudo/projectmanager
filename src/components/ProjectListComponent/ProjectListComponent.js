import React, {useEffect} from 'react';
import './projectListComponent.css';

const ProjectListComponent = ({getProjects}) => {

  useEffect(() => {
    getProjects()
  }, [getProjects])

    return(
       <div>
           ProjectListComponent
       </div>
    )
}


export default ProjectListComponent;