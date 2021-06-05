import React, {useEffect} from 'react';
import './projectListComponent.css';

const ProjectListComponent = (props) => {
  const { getProjects,errorMsg, projectListData, isFetchLading } = props;
  
  useEffect(() => {
    getProjects()
  }, [getProjects])

  useEffect(() => {
}, [projectListData])

    return(
       <div>
           ProjectListComponent
           {projectListData && projectListData[0]?.name}
       </div>
    )
}


export default ProjectListComponent;