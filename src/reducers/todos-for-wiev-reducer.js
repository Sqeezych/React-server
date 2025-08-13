export const initialTodosForWievState = [];

export const todosForWievReducer = (state = initialTodosForWievState, { type, payload }) => {
    switch (type) {
        case "SET_TODOS_FOR_WIEV": {
            return payload;
        }

        default: 
            return state;
    }
    
}