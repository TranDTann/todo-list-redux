import { configureStore } from '@reduxjs/toolkit';
import FiltersSlice from '../components/filters/filtersSlice';
import TodosSlice from '../components/todolist/todosSlice';

const store = configureStore({
    reducer: {
        filters: FiltersSlice.reducer,
        todoList: TodosSlice.reducer,
    },
});

export default store;

// import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import rootReducer from './reducer';

// const composeEnhancers = composeWithDevTools();

// const store = createStore(rootReducer, composeEnhancers);

// export default store;
