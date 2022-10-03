import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { httpRequest } from '../../utils/httpRequest';

const ToDosSlice = createSlice({
    name: 'todoList',
    initialState: { status: 'idle', todos: [] }, //status la trang thai cua cac request
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },

        deleteTodo: (state, action) => {
            state.todos.filter((todo) => todo.id !== action.payload);
        },

        check: (state, action) => {
            state.todos.map((item, index) => {
                if (item.id === action.payload) {
                    item.isChecked = !item.isChecked;
                }
                return item;
            });
        },

        todoSave: (state, action) => {
            console.log(state.todos);
            state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.name = action.payload.textInput;
                    todo.priority = action.payload.editPriority;
                }
                return todo;
            });
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading';
            })

            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = 'idle';
            })

            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'idle';
            })

            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })

            .addCase(checkTodo.fulfilled, (state, action) => {
                state.todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.isChecked = !todo.isChecked;
                    }
                    return todo;
                });
            })

            .addCase(editTodo.fulfilled, (state, action) => {
                state.todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.name = action.payload.name;
                        todo.priority = action.payload.priority;
                    }
                    return todo;
                });
            })

            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
            });
    },
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await httpRequest.get('/todos');
    return res.data;
});

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
    try {
        const res = await httpRequest.post('/todos', newTodo);
        return res.data;
    } catch (err) {
        console.log('errAdd', err);
    }
});

export const checkTodo = createAsyncThunk('todos/checkTodo', async (data) => {
    try {
        const res = await httpRequest.put(`/todos/${data.id}`, {
            isChecked: data.isChecked,
        });
        return res.data;
    } catch (err) {
        console.log('errCheck', err);
    }
});

export const editTodo = createAsyncThunk('todos/editTodo', async (dataEdit) => {
    try {
        const res = await httpRequest.put(`/todos/${dataEdit.id}`, {
            name: dataEdit.textInput,
            priority: dataEdit.editPriority,
        });
        return res.data;
    } catch (err) {
        console.log('errEdit', err);
    }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    try {
        const res = await httpRequest.delete(`/todos/${id}`);
        return res.data;
    } catch (err) {
        console.log('errDelete', err);
    }
});

export default ToDosSlice;

//Vd voi Thunk
// export const addTodos = (todo) => {
//     //thunk function creator
//     return function addTodosThunk(dispatch, getState) {
//         //thunk action
//         console.log('before', getState());
//         todo.name = '123';
//         dispatch(ToDosSlice.actions.addTodo(todo));
//         console.log('after', getState());
//     };
// };

//VớI mỗi reducer khai báo ở trên thì nó sẽ tạo ra 1 action creator tương ứng
//Vd với addTodo:
// (payload) => {
//     return {
//         type: 'todoList/addTodo',
//         payload: payload
//     }
// }

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
