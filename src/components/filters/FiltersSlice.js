import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'filters',
    initialState: {
        searchText: '',
        tab: 'All',
        priorities: [],
        options: [
            { id: 1, name: 'High', isSelected: false },
            { id: 2, name: 'Medium', isSelected: false },
            { id: 3, name: 'Low', isSelected: false },
        ],
    },
    reducers: {
        changeTab: (state, action) => {
            state.tab = action.payload;
        },

        searchInput: (state, action) => {
            state.searchText = action.payload;
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
});

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
