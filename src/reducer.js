export const initialState = {
    appState: {
        isSorted: false,
        isRefresh: false,
        isLoading: false,
        todo: '',
    },
    todosFromServer: [],
    todosForWiew: [],
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SORTING": {
            return {
                ...state,
                appState: {
                ...state.appState,
                isSorted: !state.appState.isSorted,
            } 
        }}

        case "LOADING": {
            return {
                ...state,
                appState: {
                ...state.appState,
                isLoading: payload,
            }
        }}

        case "SET_TODOS_FROM_SERVER": {
            return {
                ...state,
                todosFromServer: payload,
            }
        }

        case "SET_TODOS_FOR_WIEV": {
            return {
                ...state,
                todosForWiew: payload,
            }
        }

        default: 
            return state;
    }
}