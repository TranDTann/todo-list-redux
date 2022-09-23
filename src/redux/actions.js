export const addTodo = (data) => {
    return {
        type: 'todoList/addTodo',
        payload: data,
    };
};

export const deleteTodo = (id) => {
    return {
        type: 'todoList/deleteTodo',
        payload: id,
    };
};

export const check = (index) => {
    return {
        type: 'todoList/check',
        payload: index,
    };
};

export const changeTab = (tabId) => {
    return {
        type: 'filters/changeTab',
        payload: tabId,
    };
};

export const searchInput = (tab) => {
    return {
        type: 'filters/searchInput',
        payload: tab,
    };
};

export const prioritySearch = (id) => {
    return {
        type: 'filters/prioritySearch',
        payload: id,
    };
};

export const todoSave = (dataTodoSave) => {
    return {
        type: 'todoList/todoSave',
        payload: dataTodoSave,
    };
};
