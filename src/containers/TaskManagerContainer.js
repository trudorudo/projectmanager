import { connect } from 'react-redux';
import TasksListComponent from '../components/TasksListComponent/TasksListComponent';
import {
    getTasks,
    tasksListTasksSelector,
    isFetchLadingSelector,
    errorSelector
} from '../modules/tasks-module';


const mapStateToProps = state => ({
    errorMsg: errorSelector(state),
    tasksListData: tasksListTasksSelector(state),
    isFetchLoading: isFetchLadingSelector(state),
});

export default connect(mapStateToProps, { getTasks })(TasksListComponent)