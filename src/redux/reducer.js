import { combineReducers } from 'redux';

import filtersReducer from '../components/filters/filtersSlice';
import todosReducer from '../components/todolist/todosSlice';

const rootReducer = combineReducers({
    filters: filtersReducer,
    todoList: todosReducer,
});

export default rootReducer;
