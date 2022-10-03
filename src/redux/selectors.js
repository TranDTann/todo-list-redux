import { createSelector } from '@reduxjs/toolkit';

export const todoListSelector = (state) => state.todoList.todos;

export const searchTextSelector = (state) => state.filters.searchText;

export const tabSelector = (state) => state.filters.tab;

export const optionSelector = (state) => state.filters.options;

export const optionsSelected = (state) => state.filters.options.filter((option) => option.isSelected);

export const todosRemaining = createSelector(
    todoListSelector,
    searchTextSelector,
    tabSelector,
    optionsSelected,
    (todoList, searchText, tab, options) => {
        const nameOptions = options.map((option) => option.name);
        console.log('TodoList', todoList);
        return todoList.filter((todo) => {
            if (tab === 'All') {
                return nameOptions.length
                    ? todo.name.includes(searchText) && nameOptions.includes(todo.priority)
                    : todo.name.includes(searchText);
            }

            return nameOptions.length
                ? todo.name.includes(searchText) &&
                      (tab === 'Completed' ? todo.isChecked : !todo.isChecked) &&
                      nameOptions.includes(todo.priority)
                : todo.name.includes(searchText) && (tab === 'Completed' ? todo.isChecked : !todo.isChecked);
        });
    },
);
