// import { configureStore } from '@reduxjs/toolkit';
// import { filtersSlice } from '../components/filters/FiltersSlice';
// import todosReducer from '../components/todolist/TodosSlice';

// const store = configureStore({
//     reducer: {
//         filters: filtersSlice,
//         todoList: todosReducer,
//     },
// });

// export default store;

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer';

const composeEnhancers = composeWithDevTools();

const store = createStore(rootReducer, composeEnhancers);

export default store;
