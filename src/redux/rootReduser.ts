import { Reducer } from "react";

import { combineReducers } from "redux";

import { loginReducer } from "./redusers/loginReduser";


export interface RootState {
    login: any;
}


export const rootReduser = combineReducers<RootState>({
    login: loginReducer,
})
