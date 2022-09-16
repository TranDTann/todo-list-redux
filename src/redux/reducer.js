const initState = {
    filters: {
        searchText: '',
        tab: 'All',
        priority: [],
    },
    todoList: [],
    options: [
        { id: 1, name: 'High' },
        { id: 2, name: 'Medium' },
        { id: 3, name: 'Low' },
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

        default:
            return state;
    }
};

export default rootReducer;
