import { combineReducers } from 'redux';

import filtersReducer from '../components/filters/FiltersSlice';
import todosReducer from '../components/todolist/TodosSlice';

const rootReducer = combineReducers({
    filters: filtersReducer,
    todoList: todosReducer,
});

export default rootReducer;
