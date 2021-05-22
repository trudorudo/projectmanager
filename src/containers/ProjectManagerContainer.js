import { connect } from 'react-redux';
import ProjectListComponent from '../components/ProjectListComponent/ProjectListComponent';
import {
  getProjects
} from '../modules/projects-module'

const mapStateToProps  = state => ({

});

export default connect(mapStateToProps, {getProjects})(ProjectListComponent)