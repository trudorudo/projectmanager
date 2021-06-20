import { connect } from 'react-redux';
import TasksListComponent from '../components/TasksListComponent/TasksListComponent';
import {
    getTasks,
    updateTask,
    deleteTask,
    saveTask,
    tasksListSelector,
    isFetchLadingSelector,
    errorSelector
} from '../modules/tasks-module';
import { getTypes, typesListSelector} from '../modules/types-module';
import { getStatuses, statusesListSelector} from '../modules/statuses-module';

const mapStateToProps = state => ({
    errorMsg: errorSelector(state),
    tasksListData: tasksListSelector(state),
    isFetchLoading: isFetchLadingSelector(state),
    statusesList: statusesListSelector(state),
    typesList: typesListSelector(state)
});

export default connect(mapStateToProps, {
    getTasks,
    updateTask,
    deleteTask,
    saveTask,
    getTypes,
    getStatuses
})(TasksListComponent)