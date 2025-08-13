export const initialAppState = {
    isSorted: false,
    isRefresh: false,
    isLoading: false,
    todo: '',
}

export const appReducer = (state = initialAppState, { type, payload }) => {
    switch (type) {

        case "SORTING": {
            return {
                ...state,
                isSorted: !state.isSorted,
            } 
        }

        case "LOADING": {
            return {
                ...state,
                isLoading: payload,
            }
        }

        case "SET_TODO": {
            return {
                ...state,
                todo: payload,
            }
        }

        case "IS_REFRESH": {
            return {
                ...state,
                isRefresh: !state.isRefresh,
            }
        }

        default: 
            return state
    }
}