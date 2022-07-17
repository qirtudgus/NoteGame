import { combineReducers } from "redux";
import login from "./login";
import register  from "./register";

const rootReducer = combineReducers({
    login,
    register
})

export default rootReducer;

export type RootState  = ReturnType<typeof rootReducer>