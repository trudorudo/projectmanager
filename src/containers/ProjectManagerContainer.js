import { connect } from 'react-redux';
import ProjectListComponent from '../components/ProjectListComponent/ProjectListComponent';
import {
  getProjects,
  projectListDataSelector,
  isFetchLadingSelector,
  errorSelector
} from '../modules/projects-module'

const mapStateToProps  = state => ({
  errorMsg: errorSelector(state),
  projectListData: projectListDataSelector(state),
  isFetchLading: isFetchLadingSelector(state)
});

export default connect(mapStateToProps, {getProjects})(ProjectListComponent)