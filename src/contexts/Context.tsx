import { createContext, PropsWithChildren, useReducer } from "react";
import { userInitialState, userReducer } from '../reducers/userReducer';
import { themeInitialState, themeReducer } from '../reducers/themeReducer';
import { reducerActionType } from "../types/ReducerActionType";
import { ThemeType } from "../types/ThemeType";
import { UserType } from "../types/UserType";

type initialStateType = {
    user: UserType,
    theme: ThemeType
}

type ContextType = {
    state: initialStateType,
    dispatch: React.Dispatch<any>
}

const initialState = {
    user: userInitialState,
    theme: themeInitialState
}

export const Context = createContext<ContextType>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (state: initialStateType, action: reducerActionType) => ({
    user: userReducer(state.user, action),
    theme: themeReducer(state.theme, action)
});


export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return(
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}

