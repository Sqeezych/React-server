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

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        "SORTING": {
            return {...state,
            state.appState: {
                ...state.appState,
                state.appState.isSorted = !state.appState.isSorted;
            }
            
        }}
        default: 
            return state;
    }
}