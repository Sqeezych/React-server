export const initialTodosFromServerState = [];

export const todosFromServerReducer = (state = initialTodosFromServerState, { type, payload }) => {
    switch (type) {
        case "GET_TODOS_FROM_SERVER": {
            return payload;
        }

        default: 
            return state;
    }
    
}