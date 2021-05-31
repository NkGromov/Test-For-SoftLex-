import { API } from "../Api/api";

const APP_SET_ALL_TASKS = "APP_SET_ALL_TASKS";
const APP_SET_TASK = "APP_SET_TASK";
const APP_SET_ERROR_ADD_FORM = "APP_SET_ERROR_ADD_FORM";
const APP_SET_IS_FETCHING = "APP_SET_IS_FETCHING";

let initialState = {
    isFetching: false,
    tasks: [],
    allTaskCount: null,
    errorsAddForm: {},
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_SET_ALL_TASKS:
            return { ...state, tasks: action.data.tasks, allTaskCount: +action.data.total_task_count };
        case APP_SET_TASK:
            return { ...state, tasks: [...state.tasks, action.data] };
        case APP_SET_ERROR_ADD_FORM:
            return { ...state, errorsAddForm: action.data };
        case APP_SET_IS_FETCHING:
            return { ...state, isFetching: action.data };
        default:
            return state;
    }
};
export const AppSetAllTasks = (data) => ({
    type: APP_SET_ALL_TASKS,
    data,
});

export const AppSetTask = (data) => ({
    type: APP_SET_TASK,
    data,
});

export const AppSetErrorAddForm = (data) => ({
    type: APP_SET_ERROR_ADD_FORM,
    data,
});

export const SetFetching = (data) => ({
    type: APP_SET_IS_FETCHING,
    data,
});
export const AppGetTasks = (field, direction, page) => async (dispatch) => {
    try {
        dispatch(SetFetching(true));
        const data = await API.getAllTasks(field, direction, page);
        if (data.status === "ok") dispatch(AppSetAllTasks(data.message));
        dispatch(SetFetching(false));
    } catch (error) {}
};

export const AppAddTask = (username, email, text) => async (dispatch) => {
    try {
        dispatch(SetFetching(true));
        const data = await API.createTask(username, email, text);
        if (data.status === "error") dispatch(AppSetErrorAddForm(data.message));
        dispatch(SetFetching(false));
    } catch (error) {}
};
export default AppReducer;
