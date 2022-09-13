const initState = {
    filters: {
        search: '',
        tab: 'All',
        priority: [],
    },
    todoList: [],
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'todoList/addTodo': {
            return {
                ...state,
                todoList: [...state.todoList, action.payload],
            };
        }
        default:
            return state;
    }
};

export default rootReducer;
