import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpRequest } from '../../utils/httpRequest';

export default createSlice({
    name: 'filters',
    initialState: {
        status: 'idle', //Status cua request
        searchText: '',
        tab: 'All',
        priorities: [],
        options: [
            { id: 1, name: 'High', isSelected: false },
            { id: 2, name: 'Medium', isSelected: false },
            { id: 3, name: 'Low', isSelected: false },
        ],
        filterObject: {
            name: '',
            isCheck: null,
            priority: [],
        },
    },
    reducers: {
        searchInput: (state, action) => {
            state.searchText = action.payload;
        },

        changeTab: (state, action) => {
            state.tab = action.payload;
        },

        prioritySearch: (state, action) => {
            const newOptions = [...state.options];
            newOptions.map((option) => {
                if (option.id === action.payload) {
                    option.isSelected = !option.isSelected;
                }
                return option;
            });

            state.options = newOptions;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(searchInput.fulfilled, (state, action) => {
                state.searchText = action.meta.arg;
                state.filterObject.name = state.searchText;
            })
            .addCase(changeTab.fulfilled, (state, action) => {
                state.tab = action.meta.arg;
                if (state.tab === 'Completed') {
                    state.filterObject.isCheck = true;
                } else if (state.tab === 'To Do') {
                    state.filterObject.isCheck = false;
                } else state.filterObject.isCheck = null;
            })
            .addCase(prioritySearch.fulfilled, (state, action) => {
                console.log(action);
                state.priorities = action.meta.arg;
                state.filterObject.priority = state.priorities;
                state.options.map((option) => {
                    if (action.meta.arg.includes(option.name)) {
                        option.isSelected = true;
                    } else {
                        option.isSelected = false;
                    }
                    return option;
                });
            });
    },
});

export const searchInput = createAsyncThunk('todos/searchInput', async (data) => {});
export const changeTab = createAsyncThunk('todos/changeTab', async (data) => {});
export const prioritySearch = createAsyncThunk('todos/prioritySearch', async (data) => {});

export const todoFilter = createAsyncThunk('/todos', async (data) => {
    console.log(data);
    console.log(data);
    let namePriority = data.prioritySelected.map((item) => item.name);
    console.log(namePriority);
    try {
        const res = await httpRequest.get('/todos', {
            params: {
                name: data.filterObject.name,
                isChecked: data.filterObject.isCheck,
            },
        });
        console.log(res.data);
        if (namePriority.length > 0) {
            res.data = res.data.filter((item) => namePriority.includes(item.priority));
        }
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log('errTodoFilter', err);
    }
});

//
//
//
//Khi chua dung Toolkit
// const initState = {
//     searchText: '',
//     tab: 'All',
//     priorities: [],
//     options: [
//         { id: 1, name: 'High', isSelected: false },
//         { id: 2, name: 'Medium', isSelected: false },
//         { id: 3, name: 'Low', isSelected: false },
//     ],
// };

// const filtersReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'filters/changeTab': {
//             return {
//                 ...state,
//                 tab: action.payload,
//             };
//         }

//         case 'filters/searchInput': {
//             return {
//                 ...state,
//                 searchText: action.payload,
//             };
//         }

//         case 'filters/prioritySearch': {
//             const newOptions = [...state.options];
//             newOptions.map((option) => {
//                 if (option.id === action.payload) {
//                     option.isSelected = !option.isSelected;
//                 }
//                 return option;
//             });

//             return { ...state, options: newOptions };
//         }

//         default:
//             return state;
//     }
// };

// export default filtersReducer;
