import { createSelector } from 'reselect';

export const todoListSelector = (state) => state.todoList;

export const searchTextSelector = (state) => state.filters.searchText;

export const tabSelector = (state) => state.filters.tab;

export const optionSelector = (state) => state.options;

export const todosRemaining = createSelector(
    todoListSelector,
    searchTextSelector,
    tabSelector,
    (todoList, searchText, tab) => {
        return todoList.filter((todo) => {
            if (tab === 'All') {
                return todo.name.includes(searchText);
            }
            return todo.name.includes(searchText) && (tab === 'Completed' ? todo.isChecked : !todo.isChecked);
        });
    },
);
