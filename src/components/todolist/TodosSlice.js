import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'todoList',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },

        deleteTodo: (state, action) => {
            state.filter((todo) => todo.id !== action.payload);
        },

        check: (state, action) => {
            state.map((item, index) => {
                if (index === action.payload) {
                    item.isChecked = !item.isChecked;
                }
                return item;
            });
        },

        todoSave: (state, action) => {
            state.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.name = action.payload.textInput;
                    todo.priority = action.payload.editPriority;
                }
                return todo;
            });
        },
    },
});

// const initState = [];

// const todosReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'todoList/addTodo': {
//             return [...state, action.payload];
//         }

//         case 'todoList/deleteTodo': {
//             return state.filter((todo) => todo.id !== action.payload);
//         }

//         case 'todoList/check': {
//             return state.map((item, index) => {
//                 if (index === action.payload) {
//                     item.isChecked = !item.isChecked;
//                 }
//                 return item;
//             });
//         }

//         case 'todoList/todoSave': {
//             return state.map((todo) => {
//                 if (todo.id === action.payload.id) {
//                     todo.name = action.payload.textInput;
//                     todo.priority = action.payload.editPriority;
//                 }
//                 return todo;
//             });
//         }

//         default:
//             return state;
//     }
// };

// export default todosReducer;
