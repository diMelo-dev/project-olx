import { reducerActionType } from "../types/ReducerActionType";
import { ThemeType } from "../types/ThemeType";

export const themeInitialState: ThemeType = {
    status: 'light',
    colors: {
        bgColor: '#fff',
        textPrimaryColor: '#18122B',
        textSecondaryColor: '#808da2'
    }  
}

export function themeReducer(state: ThemeType, action: reducerActionType ) {
    
    switch(action.type) {
        case 'CHANGE_STATUS':
            return {...state, status: action.payload.status};
        break;
        case 'CHANGE_COLORS':
            return {...state, colors: action.payload.colors}
    }
    
    return state;
}