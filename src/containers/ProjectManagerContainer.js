import { connect } from 'react-redux';
import ProjectListComponent from '../components/ProjectListComponent/ProjectListComponent';
import {
  getProjects,
  saveProject,
  deleteProject,
  projectListDataSelector,
  isFetchLadingSelector,
  errorSelector,
  isAddNewProjectLoading,
  newProjectSelector
} from '../modules/projects-module'

const mapStateToProps  = state => ({
  errorMsg: errorSelector(state),
  projectListData: projectListDataSelector(state),
  isFetchLoading: isFetchLadingSelector(state),
  isAddNewLoading: isAddNewProjectLoading(state),
  newProjectData: newProjectSelector(state)
});

export default connect(mapStateToProps, {getProjects, saveProject, deleteProject})(ProjectListComponent)