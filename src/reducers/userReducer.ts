import { reducerActionType } from "../types/ReducerActionType";
import { UserType } from "../types/UserType";

export const userInitialState: UserType = {
    name: 'Danilo',
    email: 'example@gmail.com',
    password: 'example123'
}

export function userReducer(state: UserType, action: reducerActionType ) {
    
    switch(action.type) {
        case 'CHANGE_PASSWORD':
            return {...state, password: action.payload.password};
        break;
    }
    
    return state;
}