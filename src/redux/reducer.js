const initState = {
    filters: {
        searchText: '',
        tab: 'All',
        priorities: [],
    },
    todoList: [],
    options: [
        { id: 1, name: 'High', isSelected: false },
        { id: 2, name: 'Medium', isSelected: false },
        { id: 3, name: 'Low', isSelected: false },
    ],
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'todoList/addTodo': {
            return {
                ...state,
                todoList: [...state.todoList, action.payload],
            };
        }

        case 'todoList/deleteTodo': {
            return {
                ...state,
                todoList: state.todoList.filter((todo) => todo.id !== action.payload),
            };
        }

        case 'todoList/check': {
            return {
                ...state,
                todoList: state.todoList.map((item, index) => {
                    if (index === action.payload) {
                        item.isChecked = !item.isChecked;
                    }
                    return item;
                }),
            };
        }

        case 'filters/changeTab': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    tab: action.payload,
                },
            };
        }

        case 'filters/searchInput': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    searchText: action.payload,
                },
            };
        }

        case 'filters/prioritySearch': {
            const newOptions = [...state.options];
            newOptions.map((option) => {
                if (option.id === action.payload) {
                    option.isSelected = !option.isSelected;
                }
                return option;
            });

            return { ...state, options: newOptions };
        }

        case 'todoList/todoSave': {
            return {
                ...state,
                todoList: state.todoList.map((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.name = action.payload.value;
                    }
                    return todo;
                }),
            };
        }

        default:
            return state;
    }
};

export default rootReducer;
