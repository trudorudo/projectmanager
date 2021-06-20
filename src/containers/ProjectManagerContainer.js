import { connect } from 'react-redux';
import ProjectListComponent from '../components/ProjectListComponent/ProjectListComponent';
import {
  getProjects,
  saveProject,
  deleteProject,
  updateProject,
  projectListDataSelector,
  isFetchLadingSelector,
  errorSelector,
  isAddNewProjectLoading,
  newProjectSelector,
  isProjectDeletedSelector
} from '../modules/projects-module';

const mapStateToProps = state => ({
  errorMsg: errorSelector(state),
  projectListData: projectListDataSelector(state),
  isFetchLoading: isFetchLadingSelector(state),
  isAddNewLoading: isAddNewProjectLoading(state),
  newProjectData: newProjectSelector(state),
  isProjectDeleted: isProjectDeletedSelector(state)
});

export default connect(mapStateToProps, {
  getProjects,
  saveProject,
  deleteProject,
  updateProject
})(ProjectListComponent)